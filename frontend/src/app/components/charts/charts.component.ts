import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  eventId: number | null = null;
  isDataLoaded = false; // Flag to control chart visibility
  registeredVsAttendedData = [
    {
      data: [] as number[], // Initialize with empty data
      backgroundColor: ['#FF6384', '#36A2EB'], 
      label: 'Registered vs Attended'
    }
  ];
  constructor(
      private http: HttpClient,
      private route: ActivatedRoute) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id') || '';

    //this.eventId = idParam; //remenber to parse the id from string to int
    console.log(this.eventId);
    this.getdata(idParam); 
  }

  getdata(Id: number| string) {
    this.http.get<{ Reg: number, Att: number }>(`http://localhost:3000/chartsdata/reg-vs-att/${Id}`)
          .subscribe({
            next: (data) => {
              this.registeredVsAttendedData[0].data = [data.Reg, data.Att];
              this.isDataLoaded = true;
              console.log(this.registeredVsAttendedData)
            },
            error: (err) => {
              console.error('Error fetching users:', err);
            }
          });
  }


  registeredVsAttendedLabels = ['Registered', 'Attended'];

  // Section 2: Genders (Male/Female)
  gendersData = [
    {
      data: [40, 60], // Example data: 40% Male, 60% Female
      label: 'Genders'
    }
  ];

  gendersLabels = ['Male', 'Female'];

  // Section 3: Age Distribution
  ageData = [
    {
      data: [20, 35, 25, 20], // Example data: counts for different age groups
      label: 'Age Distribution'
    }
  ];

  ageLabels = ['18-24', '25-34', '35-44', '45+'];


  // Chart Options
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
}
