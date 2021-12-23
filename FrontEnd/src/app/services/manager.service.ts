import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor( private http:HttpClient) { }
    getEvents(id:string){
      return this.http.get<{status,data}>(`http://localhost:3000/api/manager/${id}/events`);
    }
}
