export interface User {
  id: number;
  email: string;
  role: string;
  username: string;
  photo?: string; 
  gender: 'male' | 'female'; 
  birthdate: Date; 
}
