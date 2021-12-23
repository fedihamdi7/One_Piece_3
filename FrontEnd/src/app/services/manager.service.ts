import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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

}
