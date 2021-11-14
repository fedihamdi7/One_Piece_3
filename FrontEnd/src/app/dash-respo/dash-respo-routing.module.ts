import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashRespoComponent } from './dash-respo.component';
import { EventsComponent } from './events/events/events.component';

const routes: Routes = [
  { path: '', component: DashRespoComponent },
  { path:'events', component:EventsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRespoRoutingModule { }
