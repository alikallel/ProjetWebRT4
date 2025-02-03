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
  numPlaces: number;
  registrationDate: Date;
  checkedIn: boolean;

}
  