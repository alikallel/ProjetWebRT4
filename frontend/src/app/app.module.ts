import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventFormComponent } from './components/event-form/event-form.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventComponent } from './components/event/event.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentSuccessComponent } from './components/payment/payment-success/payment-success.component';
import { PaymentFailComponent } from './components/payment/payment-fail/payment-fail.component';
import { EventTicketComponent } from './components/payment/event-ticket/event-ticket.component';
import { CheckIn } from './components/checkin/checkin.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartsComponent } from './components/charts/charts.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RegistrationDetailsComponent } from './components/registration-details/registration-details.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { LoginInterceptorProvider } from './interceptors/login.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventComponent,
    EventFormComponent,
    EventDetailComponent,
    AuthComponent,
    ProfileComponent,
    PaymentSuccessComponent,
    PaymentFailComponent,
    EventTicketComponent,
    CheckIn,
    ChartsComponent,
    RegistrationDetailsComponent,
    UserHistoryComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    QRCodeModule,
    MatSnackBarModule
  ],
  providers: [LoginInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
