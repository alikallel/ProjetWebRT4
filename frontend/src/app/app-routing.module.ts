import { NgModule } from '@angular/core';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentFailComponent } from './components/payment/payment-fail/payment-fail.component';
import { PaymentSuccessComponent } from './components/payment/payment-success/payment-success.component';
import { ChartsComponent } from './components/charts/charts.component';
import { RegistrationDetailsComponent } from './components/registration-details/registration-details.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import { HomeComponent } from './components/home/home.component';
import { MyEventComponent } from './components/my-event/my-event.component';
import { LoginGuard } from './guards/login.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'events', redirectTo: '/events/page/1', pathMatch: 'full' },
  { path: 'events/page/:page', component: EventListComponent, canActivate: [LoginGuard] },
  { path: 'add-event', component: EventFormComponent },
  { path: 'event-details/:id', component: EventDetailComponent },
  // { path: 'auth', component: AuthComponent },
  {path: 'profile', component:ProfileComponent},
  { path: 'payment/success', component: PaymentSuccessComponent },
  { path: 'payment/fail', component: PaymentFailComponent },
  { path: 'charts/:id', component: ChartsComponent},
  { path: 'registration-details/:id', component: RegistrationDetailsComponent },
  { path: 'user-history', component: UserHistoryComponent },
  {path: 'my-event', component: MyEventComponent, canActivate: [LoginGuard, RoleGuard]},
  //{ path: '**', redirectTo: '/events/page/1' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  //{ path: '**', redirectTo: 'login' },
  { path: '', component : HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
