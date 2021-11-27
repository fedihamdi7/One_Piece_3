import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../event.model';
import { events } from '../events-list';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  public event?: Event;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get("id");
      this.event = events.find(e => e.id == eventId);
      //this.event = events.filter(event => event.id === eventId)[0];
    });
  }

}
