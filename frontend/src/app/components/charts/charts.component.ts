import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  eventId: number | null = null;
  isDataLoaded = false; 

  registeredVsAttendedData = [
    {
      data: [] as number[],
      backgroundColor: ['#FF6384', '#36A2EB'], 
      label: 'Registered vs Attended'
    }
  ];
  registeredVsAttendedLabels = ['Registered', 'Attended'];

  ageData = [
    {
      data: [] as number[], 
      label: 'Age Distribution'
    }
  ];
  ageLabels: string[] = [];

  gendersData = [
    {
      data: [] as number[], 
      label: 'Gender Distribution'
    }
  ];
  gendersLabels= ['Male', 'Female'];

  constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private cdr: ChangeDetectorRef) {}

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
            },
            error: (err) => {
              console.error('Error fetching users:', err);
            }
          });

          this.http.get<{ male: number, female: number }>(`http://localhost:3000/chartsdata/genders/${Id}`)
          .subscribe({
            next: (data) => {
              console.log(data);
              this.gendersData[0].data = [data.male,data.female];
              this.isDataLoaded = true;
              console.log(this.gendersData);
              this.cdr.detectChanges();
            },
            error: (err) => {
              console.error('Error fetching Gender Data:', err);
            }
          });

          this.http.get<{ [key: string]: number }>(`http://localhost:3000/chartsdata/age/${Id}`)
          .subscribe({
            next: (data) => {
              this.ageLabels = Object.keys(data);
              this.ageData[0].data = Object.values(data);
              this.isDataLoaded = true;
            },
            error: (err) => {
              console.error('Error fetching Age Data:', err);
            }
          });

  }

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
}
