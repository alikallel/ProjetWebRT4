import { User } from "./user.model";

export interface Event {
    registrations: any;
    id: number;          
    title: string;      
    description: string; 
    date: string;
    location: string; 
    organizer: User;
    price : number;  
    capacity : number; 
    image?: string;
  }
  export interface EventRegistration {
    registration_id: string;
    event_id: number;
    quantity: number;
  }
  
  export interface PaymentResponse {
    payment_link: string;
    status: string;
  }
  