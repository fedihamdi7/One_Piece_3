import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Club } from '../admin/club/club.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API_URL: string = 'http://localhost:3000/api/admin';

  private clubs:Club[];
  private clubUpdated = new Subject<Club[]>();

  constructor( private http:HttpClient) { }

    getClubs(){
      this.http.get<any>(`http://localhost:3000/api/allclub/getAllClub`).subscribe(res=>{
        this.clubs = res;
        this.clubUpdated.next([...this.clubs]);
      });
    }

    getClubList(){
      return this.clubs;
    }

    getClubsUpdateListener(){
      return this.clubUpdated.asObservable();
    }

    editClub(club:Club){

      const clubData = new FormData();
      clubData.append('club_id',club.id);
      clubData.append('club_name',club.name);
      clubData.append('club_theme',club.theme);
      clubData.append('about',club.about);
      clubData.append('club_img',club.club_img);

      this.http.put(`${this.API_URL}/${club.id}/clubs`,clubData)
      .subscribe(res=>{
        const updatedclubs = [...this.clubs];
        const oldClubIndex = updatedclubs.findIndex(c=>c.id === club.id);
        updatedclubs[oldClubIndex] = club;
        this.clubs = updatedclubs;
        this.clubUpdated.next([...this.clubs]);

      });
    }

    addClub(club:Club){
      const clubData = new FormData();
      clubData.append('club_id',club.id);
      clubData.append('club_name',club.name);
      clubData.append('club_theme',club.theme);
      clubData.append('about',club.about);
      clubData.append('club_img',club.club_img);
      clubData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);


      this.http.post(`${this.API_URL}/${club.id}/clubs`,clubData)
      .subscribe(res=>{
        const updatedclubs = [...this.clubs];
        updatedclubs.push(club);
        this.clubs = updatedclubs;
        this.clubUpdated.next([...this.clubs]);
      });
    }

    deleteClub(id:string){
      this.http.delete(`${this.API_URL}/${id}/clubs`)
      .subscribe(res=>{
        const updatedclubs = this.clubs.filter(c=>c.id !== id);
        this.clubs = updatedclubs;
        this.clubUpdated.next([...this.clubs]);

      });
    }

  getUsers(){
    return this.http.get<any>(`${this.API_URL}/getUsers`);
  }

}