import { Component, OnInit } from '@angular/core';
import { Event } from './event.model';
import { events } from './events-list';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public eventsList : Event[] = events;
  constructor() { }

  ngOnInit(): void {
  }

}
