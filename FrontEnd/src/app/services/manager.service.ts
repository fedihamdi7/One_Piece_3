import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Event } from '../dash-respo/events/event.model';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private Events:Event[];
  private eventUpdated = new Subject<Event[]>();

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

    editEvent(event:Event){
      console.log(event);

      const newEvent:Event = {event_id : event.event_id , event_name : event.event_name , event_date : event.event_date , event_img : event.event_img};
      this.http.put(`http://localhost:3000/api/manager/${event.event_id}/events`,newEvent)
      .subscribe(res=>{
        console.log(res);

      });
    }

}
