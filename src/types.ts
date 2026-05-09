export interface Project {
  id: string;
  title: string;
  createdAt: string;
  sketchImage: string; // Base64 or URL
  designedImage?: string; // High-fidelity result
  style: DesignMode;
  prompt: string;
  isFavorite: boolean;
  colorPreset?: string;
  notes?: string;
  aiCreditsUsed: number;
  layoutAnalysis?: {
    components: DetectedComponent[];
    colors: string[];
    typography: string;
    score: number;
    feedback: string[];
  };
}

export type DesignMode =
  | 'ui-wireframe'
  | 'mobile-app'
  | 'dashboard'
  | 'landing-page'
  | 'illustration'
  | 'logo-design'
  | 'architecture'
  | 'interior'
  | 'product-prototype'
  | 'anime'
  | 'minimal-modern'
  | 'corporate-professional';

export interface DesignPreset {
  id: DesignMode;
  name: string;
  description: string;
  icon: string;
  samplePrompt: string;
  bgColor: string; // Gradient bg for UI cards
  accentColor: string;
}

export interface DetectedComponent {
  id: string;
  type: string;
  confidence: number;
  boundingBox: { x: number; y: number; w: number; h: number };
  suggestion: string;
}

export interface UserStats {
  creditsLeft: number;
  creditsMax: number;
  projectsCount: number;
  exportsCount: number;
  tier: 'Free Trial' | 'Pro' | 'Enterprise';
}

export interface PromptTemplate {
  title: string;
  prompt: string;
  category: string;
}
