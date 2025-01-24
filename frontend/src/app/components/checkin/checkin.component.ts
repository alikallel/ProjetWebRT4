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
    //users: CheckInData[] = [];
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
        this.http.get<any[]>(`http://localhost:8080/listregisted/${Id}`)
          .subscribe({
            next: (data) => {
              this.users = data.map(user => ({
                ...user,
                checkedIn: false // Initialize checkedIn state
              }));
            },
            error: (err) => {
              console.error('Error fetching users:', err);
              this.error = true;
            }
          });
      }

  users = [
    { id: 1, name: 'John Doe', status: 'Active', amount: 120, photo: 'https://randomuser.me/api/portraits/men/1.jpg', checkedIn: false },
    { id: 2, name: 'Jane Smith', status: 'Inactive', amount: 95, photo: 'https://randomuser.me/api/portraits/women/2.jpg', checkedIn: false },
    { id: 3, name: 'Chris Johnson', status: 'Active', amount: 200, photo: 'https://randomuser.me/api/portraits/men/3.jpg', checkedIn: false },
    { id: 4, name: 'Emily Brown', status: 'Inactive', amount: 150, photo: 'https://randomuser.me/api/portraits/women/4.jpg', checkedIn: false }
  ];

  toggleCheckIn(user: any) {
    user.checkedIn = !user.checkedIn;
    console.log(user.checkedIn); 
  }
  
}
