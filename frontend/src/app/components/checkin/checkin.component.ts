import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CheckInData } from 'src/app/models/checkindata.model';

@Component({
  selector: 'user-list',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckIn {

    error=false;
    users: CheckInData[] = [];
    eventId: number | null = null;
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute) {}
  
    ngOnInit() {
        const idParam = this.route.snapshot.paramMap.get('id') || '';

        //this.eventId = idParam; //remenber to parse the id from string to int
        console.log(this.eventId);
        this.fetchUsers(idParam); 
    }

    fetchUsers(Id: number| string) {
        this.http.get<any[]>(`http://localhost:3000/checkin/${Id}`)
          .subscribe({
            next: (data) => {
              this.users = data;
            },
            error: (err) => {
              console.error('Error fetching users:', err);
              this.error = true;
            }
          });
      }


    toggleCheckIn(user: CheckInData) {
      const newCheckedInStatus = !user.checkedIn;
  
      this.http
        .patch(`http://localhost:3000/checkin/${user.reg_id}`, {
          checkedIn: newCheckedInStatus,
        }, { responseType: 'text' })
        .subscribe({
          next: () => {
            user.checkedIn = newCheckedInStatus; // Update the UI on success
            console.log('Check-in status updated successfully.');
          },
          error: (err) => {
            console.error('Error updating check-in status:', err);
            // Revert the change on error
            user.checkedIn = !newCheckedInStatus;
          },
        });
    }
  
}
