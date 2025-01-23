import { NgModule } from '@angular/core';

import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import {AuthComponent} from "./components/auth/auth.component";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'events', redirectTo: '/events/page/1', pathMatch: 'full' },
  { path: 'events/page/:page', component: EventListComponent },
  { path: 'add-event', component: EventFormComponent },
  { path: 'event-details/:id', component: EventDetailComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/events/page/1' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
