import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';

const routes: Routes = [
  { path: 'events', component: EventListComponent }, 
  { path: 'events/page/:page', component: EventListComponent }, 
  { path: 'add-event', component: EventFormComponent }, 
  { path: 'events/page', redirectTo: '/events/page/1' },  // Redirection par défaut pour toutes les autres pages
  {path:'event-details/:id',component:EventDetailComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
