import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/services/manager.service';
import { EventType } from './event.model';
import { events } from './events-list';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit , OnDestroy {

  eventsList : EventType[] = [];
  private eventSub : Subscription;
  constructor(private managerService : ManagerService) { }


  managerId = localStorage.getItem('user');

  ngOnInit(): void {
    this.managerService.getEvents(JSON.parse(this.managerId).club_id);

    this.eventSub = this.managerService.getEventUpdateListener()
    .subscribe((events:any)=>{
      this.eventsList = events;
    });
  }


  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }

}
