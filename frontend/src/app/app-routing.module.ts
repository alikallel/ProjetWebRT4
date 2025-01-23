import { NgModule } from '@angular/core';

import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import {AuthComponent} from "./components/auth/auth.component";
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'events', component: EventListComponent }, 
  { path: 'events/page/:page', component: EventListComponent }, 
  { path: 'add-event', component: EventFormComponent }, 
  { path: 'events/page', redirectTo: '/events/page/1' },  // Redirection par défaut pour toutes les autres pages
  { path: 'events', component: EventListComponent },
  { path: 'add-event', component: EventFormComponent },
  {path:'event-details/:id',component:EventDetailComponent},
  { path: 'auth', component: AuthComponent },
  {path: 'profile', component:ProfileComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
