export interface Post {
  content: string;
  timestamp: string;
}

export interface Board {
  content: string;
  lastUpdated: string | null;
}