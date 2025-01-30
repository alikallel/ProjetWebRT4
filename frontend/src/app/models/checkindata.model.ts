enum Status {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export interface CheckInData {
  reg_id: number;          
  username: string;      
  status: Status; 
  userPhoto: string;
  registrationDate: Date;
  checkedIn: boolean;

}
  