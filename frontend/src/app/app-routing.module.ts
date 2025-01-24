import { NgModule } from '@angular/core';

import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import {AuthComponent} from "./components/auth/auth.component";
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentFailComponent } from './components/payment/payment-fail/payment-fail.component';
import { PaymentSuccessComponent } from './components/payment/payment-success/payment-success.component';
import { CheckIn } from './components/checkin/checkin.component'

const routes: Routes = [
  { path: 'events', redirectTo: '/events/page/1', pathMatch: 'full' },
  { path: 'events/page/:page', component: EventListComponent },
  { path: 'add-event', component: EventFormComponent },
  { path: 'event-details/:id', component: EventDetailComponent },
  { path: 'auth', component: AuthComponent },
  {path: 'profile', component:ProfileComponent},
  { path: 'payment/success', component: PaymentSuccessComponent },
  { path: 'payment/fail', component: PaymentFailComponent },
  { path: 'CheckList/:id', component: CheckIn },
  { path: '**', redirectTo: '/events/page/1' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
