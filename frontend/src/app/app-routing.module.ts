import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import {AuthComponent} from "./components/auth/auth.component";

const routes: Routes = [
  { path: 'events', component: EventListComponent },
  { path: 'add-event', component: EventFormComponent },
  {path:'event-details/:id',component:EventDetailComponent},
  { path: 'auth', component: AuthComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
