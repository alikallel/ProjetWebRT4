import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventComponent } from './components/event/event.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { FormsModule } from '@angular/forms';
import { EventDetailComponent } from './components/event-detail/event-detail.component';  

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventComponent,
    EventFormComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
