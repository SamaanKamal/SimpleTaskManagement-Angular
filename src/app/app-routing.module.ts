import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventUpdateFormComponent } from './event-update-form/event-update-form.component';
import { UpdateResponseComponent } from './update-response/update-response.component';
import { CreationResponseComponent } from './creation-response/creation-response.component';
import { DeletionResponseComponent } from './deletion-response/deletion-response.component';

const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'create-event', component: EventFormComponent },
  { path: 'update-event/:id', component: EventUpdateFormComponent },
  { path: 'updated-event/:id', component: UpdateResponseComponent },
  { path: 'created-Event', component: CreationResponseComponent },
  { path: 'deleted-Event/:id', component: DeletionResponseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
