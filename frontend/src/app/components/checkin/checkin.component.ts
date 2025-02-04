import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckInData } from 'src/app/models/checkindata.model';

@Component({
  selector: 'user-list',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckIn implements OnInit {
  @Input() eventId: number = -10;

  error = false;
  users: CheckInData[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.eventId) {
      this.fetchUsers(this.eventId);
    }
  }

  fetchUsers(eventId: number | string) {
    this.http.get<any[]>(`http://localhost:3000/checkin/${eventId}`)
      .subscribe({
        next: (data) => {
          this.users = data.map(user => ({
            ...user,
            checkedIn: Boolean(user.checkedIn)
          }));
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          this.error = true;
        }
      });
  }

  toggleCheckIn(user: CheckInData) {
    const newCheckedInStatus = user.checkedIn;
  
    this.http
      .patch(`http://localhost:3000/checkin/${user.reg_id}`, {
        checkedIn: newCheckedInStatus,
      }, { responseType: 'text' })
      .subscribe({
        next: () => {
          console.log('Check-in status updated successfully.');
        },
        error: (err) => {
          console.error('Error updating check-in status:', err);
          user.checkedIn = !newCheckedInStatus;
        },
      });
  }
}