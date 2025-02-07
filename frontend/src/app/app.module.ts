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
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { LoginInterceptorProvider } from './interceptors/login.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { PopularEventsComponent } from './components/popular-events/popular-events.component';
import { FormContainerComponent } from './components/shared/form-container/form-container.component';
import { InputComponent } from './components/shared/input/input.component';
import { ValidationMessagePipe } from './components/shared/validation-message.pipe';
import { SelectComponent } from './components/shared/select/select.component';
import { MyEventComponent } from './components/my-event/my-event.component';
import { SliderComponent } from './components/slider/slider.component';
import { AuthLayoutComponent } from './components/auth/auth-layout/auth-layout.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginGuard } from './guards/login.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { RoleGuard } from './guards/role.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { EventRegistrationModalComponent } from './components/event-registration-modal/event-registration-modal.component';
import { SponsorshipPaymentsComponent } from './components/sponsorship-payments/sponsorship-payments.component';


@NgModule({
  declarations: [
    HomeComponent,
    PopularEventsComponent,
    AppComponent,
    FormContainerComponent,
    InputComponent,
    SelectComponent,
    ValidationMessagePipe,
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
    MyEventComponent,
    SliderComponent,
    AuthLayoutComponent,
    AboutUsComponent,
    DefaultImagePipe,
    UnauthorizedComponent,
    NavbarComponent,
    FooterComponent,
    QrScannerComponent,
    EventRegistrationModalComponent,
    SponsorshipPaymentsComponent,
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
    MatSnackBarModule,
    FontAwesomeModule,
    ZXingScannerModule,
  ],
  providers: [LoginInterceptorProvider,LoginGuard, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
