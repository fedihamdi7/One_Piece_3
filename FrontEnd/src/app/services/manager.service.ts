import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EventType } from '../dash-respo/events/event.model';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private Events:EventType[];
  private eventUpdated = new Subject<EventType[]>();

  constructor( private http:HttpClient) { }

    getEvents(id:string){
      this.http.get<any>(`http://localhost:3000/api/manager/${id}/events`).subscribe(res=>{
        this.Events = res[0].events;
        this.eventUpdated.next([...this.Events]);
      });
    }

    getEventList(){
      return this.Events;
    }

    getEventUpdateListener(){
      return this.eventUpdated.asObservable();
    }

    editEvent(event:EventType){
  
      const eventData = new FormData();
      eventData.append('event_id',event.event_id);
      eventData.append('event_name',event.event_name);
      eventData.append('event_date',event.event_date);
      eventData.append('event_img',event.event_img);

      this.http.put(`http://localhost:3000/api/manager/${event.event_id}/events`,eventData)
      .subscribe(res=>{
        const updatedEvents = [...this.Events];
        const oldEventIndex = updatedEvents.findIndex(e=>e.event_id === event.event_id);
        updatedEvents[oldEventIndex] = event;
        this.Events = updatedEvents;
        this.eventUpdated.next([...this.Events]);

      });
    }

}
