import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EventType } from '../dash-respo/events/event.model';
import { Team } from '../dash-respo/team/team.model';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private Events:EventType[];
  private TeamsList:Team[];
  private eventUpdated = new Subject<EventType[]>();
  private teamUpdated = new Subject<Team[]>();
  private head = this.getHeaders().headers;
  public logo = new Subject<string>();
  constructor( private http:HttpClient) { }

    getHeaders(){
      const token = localStorage.getItem('id_token');
      const id = JSON.parse(localStorage.getItem('user')).userId;
      return {
        headers: {
          'Authorization': 'Bearer ' + token,
          'userId': id
        }
      };
    }
//////////////////////////////////////// Events ////////////////////////////////////////

    getEvents(id:string){

      this.http.get<any>(`http://localhost:3000/api/manager/${id}/events`,{headers:this.head}).subscribe(res=>{
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

    editEventNoImage(event:EventType){

      this.http.put<any>(`http://localhost:3000/api/manager/${event.event_id}/eventsNoImage`,event,{headers:this.head})
      .subscribe(res=>{
          const updatedEvents = [...this.Events];
        const oldEventIndex = updatedEvents.findIndex(e=>e.event_id === event.event_id);
        updatedEvents[oldEventIndex].event_name = event.event_name;
        updatedEvents[oldEventIndex].event_date = event.event_date;
        this.Events = updatedEvents;
        this.eventUpdated.next([...this.Events]);

      });
    }
    editEvent(event:EventType){
      const eventData = new FormData();
      eventData.append('event_id',event.event_id);
      eventData.append('event_name',event.event_name);
      eventData.append('event_date',event.event_date);
      eventData.append('event_img',event.event_img);

      this.http.put(`http://localhost:3000/api/manager/${event.event_id}/events`,eventData,{headers:this.head})
      .subscribe(res=>{
        const updatedEvents = [...this.Events];
        const oldEventIndex = updatedEvents.findIndex(e=>e.event_id === event.event_id);
        updatedEvents[oldEventIndex] = event;
        this.Events = updatedEvents;
        this.eventUpdated.next([...this.Events]);

      });
    }

    addEvent(event:EventType){
      const eventData = new FormData();
      eventData.append('event_name',event.event_name);
      eventData.append('event_date',event.event_date);
      eventData.append('event_img',event.event_img);
      eventData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);


      this.http.post(`http://localhost:3000/api/manager/${event.event_id}/events`,eventData,{headers:this.head})
      .subscribe(res=>{
        const updatedEvents = [...this.Events];
        updatedEvents.push(event);
        this.Events = updatedEvents;
        this.eventUpdated.next([...this.Events]);
      });
    }

    deleteEvent(id:string){
      this.http.delete(`http://localhost:3000/api/manager/${id}/events`,{headers:this.head})
      .subscribe(res=>{
        const updatedEvents = this.Events.filter(e=>e.event_id !== id);
        this.Events = updatedEvents;
        this.eventUpdated.next([...this.Events]);

      });
    }

//////////////////////////////////////// Logo ////////////////////////////////////////

    getLogo(){
      const club_id = JSON.parse(localStorage.getItem('user')).club_id;

      this.http.get<any>(`http://localhost:3000/api/manager/${club_id}/logo`,{headers:this.head}).subscribe(res=>{
        this.logo.next(res[0].image);
        // console.log(res[0].image);

      });
    }
    getLogoUpdateListener(){
      return this.logo.asObservable();
    }

    ChangeLogo(logo:string){
      const eventData = new FormData();
      eventData.append('logo',logo);
      const id = JSON.parse(localStorage.getItem('user')).club_id;
      this.http.put(`http://localhost:3000/api/manager/${id}/logo`,eventData,{headers:this.head})
      .subscribe(res=>{
        console.log(res);
      });

    }

//////////////////////////////////////// team ////////////////////////////////////////

getTeamList(){
  this.getTeam();
  return this.TeamsList;
}

getTeam(){
  const club_id=JSON.parse(localStorage.getItem('user')).club_id;
  const user_id=JSON.parse(localStorage.getItem('user')).userId;
  const token='Bearer '+localStorage.getItem('id_token');
  const header={
    'Authorization': token,
    'userId':user_id
  };
   this.http.get(`http://localhost:3000/api/manager/${club_id}/team`,{headers:header})
   .subscribe(
    (resultat:any) => {
      this.TeamsList = resultat.team;
      this.teamUpdated.next([...this.TeamsList]);
    }
  );
  }
  getupdatedTeamListener(){
    return this.teamUpdated.asObservable();
  }
  addTeam(team:Team){
    const teamData = new FormData();
    teamData.append('team_name',team.team_name);
    teamData.append('team_titre',team.team_titre);
    teamData.append('team_img',team.team_img);
    teamData.append('team_fb',team.team_fb);
    teamData.append('team_insta',team.team_insta);
    teamData.append('team_linkedin',team.team_linkedin);
    teamData.append('team_twitter',team.team_twitter);
    const club_id=JSON.parse(localStorage.getItem('user')).club_id;

    this.http.post(`http://localhost:3000/api/manager/${club_id}/team`,teamData,{headers:this.head})
    .subscribe(res=>{
      const updatedTeam = [...this.TeamsList];
      updatedTeam.push(team);
      this.TeamsList = updatedTeam;
      this.teamUpdated.next([...this.TeamsList]);
    });
  }
}
