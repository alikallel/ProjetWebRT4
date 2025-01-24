enum Status {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export interface CheckInData {
  id: number;          
  userN: string;      
  status: Status; 
  photoUrl: string;
  checkedIn: boolean;
}
  