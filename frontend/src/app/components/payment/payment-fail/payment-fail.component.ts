import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-fail',
  templateUrl: './payment-fail.component.html',
  styleUrls: ['./payment-fail.component.css'],
})
export class PaymentFailComponent implements OnInit {
  paymentId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.paymentId = params['payment_id'];
    });
  }

  retryPayment() {
    this.router.navigate(['/events']);
  }
}
