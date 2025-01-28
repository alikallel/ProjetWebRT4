import { Component } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  // Section 1: Registered vs Attended
  registeredVsAttendedData = [
    {
      data: [30, 70],
      backgroundColor: ['#FF6384', '#36A2EB'], 
      label: 'Registered vs Attended'
    }
  ];

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
