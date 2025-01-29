export interface User {
    id: number;
    email: string;
    role: string;
    username: string;
    photo?: string; // URL optionnelle
  }