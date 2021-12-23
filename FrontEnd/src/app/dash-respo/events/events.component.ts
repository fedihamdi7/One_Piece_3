import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { Event } from './event.model';
import { events } from './events-list';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public eventsList : Event[] = events;
  constructor(private managerService : ManagerService) { }
  managerId = localStorage.getItem('user');
  ngOnInit(): void {
    this.managerService.getEvents(JSON.parse(this.managerId).club_id).subscribe((res)=>{
      this.eventsList = res[0].events;
      console.log(res[0].events);

    });

  }

}
