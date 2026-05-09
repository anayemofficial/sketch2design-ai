import React, { useRef, useState, useEffect } from 'react';
import { 
  Pencil, 
  Paintbrush, 
  Eraser, 
  Grid, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut, 
  Trash2, 
  Download, 
  Sparkles,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';

interface DrawingCanvasProps {
  onSketchSelect: (base64Image: string) => void;
  savedSketch?: string;
  onAutoSave?: (base64Image: string) => void;
}

export default function DrawingCanvas({ onSketchSelect, savedSketch, onAutoSave }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [tool, setTool] = useState<'pencil' | 'brush' | 'eraser'>('pencil');
  const [color, setColor] = useState<string>('#4F46E5');
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Undo / Redo history
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions based on parent container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      // Save current content first
      const currentContent = canvas.toDataURL();
      
      canvas.width = parent.clientWidth;
      canvas.height = 450;
      
      // Re-draw background filled with off-white/dark depending on theme
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Reload previous content if it exists
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      if (currentContent && currentContent !== 'data:,') {
        img.src = currentContent;
      } else if (savedSketch) {
        img.src = savedSketch;
      }
    };

    resizeCanvas();
    
    // Add default initial history state
    setTimeout(() => {
      if (canvas) {
        const initialURL = canvas.toDataURL();
        setHistory([initialURL]);
        setHistoryIndex(0);
      }
    }, 200);

    // Watch resizing
    const resizeObserver = new ResizeObserver(() => {
      const parent = canvas.parentElement;
      if (parent && canvas.width !== parent.clientWidth) {
        resizeCanvas();
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Sync canvas with savedSketch if received updated prop
  useEffect(() => {
    if (savedSketch && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          saveToHistory();
        };
        img.src = savedSketch;
      }
    }
  }, [savedSketch]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const currentURL = canvas.toDataURL();
    
    // Slice history if we performed undos previously
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(currentURL);
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Trigger autosave if available
    if (onAutoSave) {
      onAutoSave(currentURL);
    }
  };

  const undo = () => {
    if (historyIndex <= 0) return;
    const newIdx = historyIndex - 1;
    setHistoryIndex(newIdx);
    restoreState(history[newIdx]);
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;
    const newIdx = historyIndex + 1;
    setHistoryIndex(newIdx);
    restoreState(history[newIdx]);
  };

  const restoreState = (dataURL: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      if (onAutoSave) {
        onAutoSave(dataURL);
      }
    };
    img.src = dataURL;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  // Coordinates helper taking zoom into account
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Adjust for bounding rect and canvas zoom scale
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    return { x, y };
  };

  // Drawing Events
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const pos = getCoordinates(e);
    setIsDrawing(true);
    setLastPos(pos);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    
    // Tool config
    if (tool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = lineWidth * 3; // Eraser slightly larger for utility
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = tool === 'pencil' ? Math.max(1, lineWidth / 2) : lineWidth;
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    setLastPos(pos);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const downloadSketch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const imageURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = `sketch-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendToEnhancer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const base64Image = canvas.toDataURL('image/png');
    onSketchSelect(base64Image);
  };

  const pColors = [
    '#4F46E5', // Indigo
    '#3B82F6', // Blue
    '#06B6D4', // Cyan
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#EC4899', // Pink
    '#111827', // Obsidian
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/60 overflow-hidden" id="drawing-studio-container">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/80 border-b border-slate-700/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></div>
          <h3 className="font-sans font-medium text-slate-100 text-sm tracking-wide">STUDIO DRAWING CANVAS</h3>
        </div>
        
        {/* Undo, Redo, Zoom, Grid */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/50">
          <button 
            onClick={undo} 
            disabled={historyIndex <= 0}
            className="p-1.5 rounded text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Undo (Ctrl+Z)"
            id="btn-undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button 
            onClick={redo} 
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Redo (Ctrl+Y)"
            id="btn-redo"
          >
            <Redo className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-slate-700 mx-1"></div>

          <button 
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} 
            className="p-1.5 rounded text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            title="Zoom Out"
            id="btn-zoom-out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-xxs px-1 text-slate-400 w-10 text-center select-none">
            {Math.round(zoom * 100)}%
          </span>
          <button 
            onClick={() => setZoom(Math.min(2, zoom + 0.1))} 
            className="p-1.5 rounded text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            title="Zoom In"
            id="btn-zoom-in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-slate-700 mx-1"></div>

          <button 
            onClick={() => setShowGrid(!showGrid)} 
            className={`p-1.5 rounded transition-colors ${showGrid ? 'bg-indigo-600/30 text-indigo-400' : 'text-slate-400 hover:bg-slate-700'}`}
            title="Toggle Drafting Grid"
            id="btn-grid"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 relative min-h-[450px]">
        {/* Left Toolbar */}
        <div className="flex lg:flex-col items-center justify-between lg:justify-start gap-4 p-4 bg-slate-900/40 border-b lg:border-b-0 lg:border-r border-slate-700/60 z-10 w-full lg:w-48">
          
          {/* Tools */}
          <div className="flex lg:flex-col gap-2 w-full">
            <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest hidden lg:block mb-1">DRAFT TOOLS</span>
            <button
              onClick={() => setTool('pencil')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-sans font-medium w-full transition-all ${
                tool === 'pencil' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
              id="tool-pencil"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden sm:inline lg:inline">Fine Pencil</span>
            </button>
            <button
              onClick={() => setTool('brush')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-sans font-medium w-full transition-all ${
                tool === 'brush' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
              id="tool-brush"
            >
              <Paintbrush className="w-3.5 h-3.5" />
              <span className="hidden sm:inline lg:inline">Flowing Brush</span>
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-sans font-medium w-full transition-all ${
                tool === 'eraser' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
              id="tool-eraser"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span className="hidden sm:inline lg:inline">Draft Eraser</span>
            </button>
          </div>

          <div className="hidden lg:block w-full h-px bg-slate-800 my-2"></div>

          {/* Size */}
          <div className="flex flex-col gap-1 w-full max-w-[120px] sm:max-w-none">
            <div className="flex justify-between items-center text-xxs font-mono text-slate-400">
              <span className="uppercase tracking-widest hidden lg:block">SIZE</span>
              <span>{lineWidth}px</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="40" 
              value={lineWidth}
              onChange={(e) => setLineWidth(parseInt(e.target.value))}
              className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="hidden lg:block w-full h-px bg-slate-800 my-2"></div>

          {/* Color Palette */}
          <div className="flex lg:flex-col gap-2 w-full items-center lg:items-start">
            <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest hidden lg:block mb-1">PALETTE</span>
            <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 gap-1.5">
              {pColors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full transition-transform ${color === c ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 scale-110' : 'hover:scale-105'}`}
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <input 
                type="color" 
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-6 h-6 bg-transparent border-0 cursor-pointer rounded-md overflow-hidden"
                id="color-picker-custom"
                title="Custom Color"
              />
              <span className="text-xxs font-mono text-slate-400 hidden lg:inline uppercase">{color}</span>
            </div>
          </div>
        </div>

        {/* Canvas Wrap */}
        <div ref={containerRef} className="flex-1 relative bg-white/5 overflow-hidden flex items-center justify-center">
          {/* Custom SVG Grid Overlay */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748B" strokeWidth="0.5" />
                    <circle cx="0" cy="0" r="1.5" fill="#64748B" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          )}

          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="block cursor-crosshair relative z-10 mx-auto transition-transform duration-75 origin-center select-none"
            style={{ transform: `scale(${zoom})` }}
          />

          {/* Background watermark hint */}
          <div className="absolute bottom-4 left-4 pointer-events-none select-none z-10 text-xxs font-mono text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800/80 backdrop-blur-md">
            [HTML5 Canvas] Touch, Draw, Scratch freely
          </div>
        </div>
      </div>

      {/* Footer Drawing Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 border-t border-slate-700/60 z-15">
        <button
          onClick={clearCanvas}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-rose-400 transition-colors text-xs font-medium font-sans"
          id="btn-clear-canvas"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Workspace
        </button>

        <div className="flex gap-3">
          <button
            onClick={downloadSketch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-xs font-medium font-sans animate-fade-in"
            id="btn-download-raw-canvas"
          >
            <Download className="w-3.5 h-3.5" />
            Download Sketch
          </button>
          <button
            onClick={sendToEnhancer}
            className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg shadow-lg shadow-indigo-500/20 text-xs font-medium font-sans group transition-all"
            id="btn-send-to-ai"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200 group-hover:rotate-12 transition-transform" />
            Send to AI Designer
          </button>
        </div>
      </div>
    </div>
  );
}
