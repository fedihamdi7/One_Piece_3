import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { Event } from '../event.model';
;

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  public event?: Event;
  public eventsList : Event[];

  constructor(private route: ActivatedRoute,private managerService : ManagerService) { }
  managerId = localStorage.getItem('user');
  ngOnInit(): void {
    this.managerService.getEvents(JSON.parse(this.managerId).club_id).subscribe((res)=>{
      this.eventsList = res[0].events;
      this.route.paramMap.subscribe(params => {
        const eventId = params.get("id");
        this.event = this.eventsList.find(e => e.event_id == eventId);

      });
    });


  }

}
