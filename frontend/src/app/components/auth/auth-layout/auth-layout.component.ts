import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {
  images = [
    '/assets/slider1.jpg',
    '/assets/slider2.jpg',
    '/assets/slider3.jpg',
    '/assets/slider4.jpg',
    '/assets/bolice.jpg'
  ];

  currentImage: string = '';

  ngOnInit() {
    this.currentImage = this.getRandomImage();
  }

  private getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    return this.images[randomIndex];
  }
}
