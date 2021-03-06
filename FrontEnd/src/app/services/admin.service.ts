
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
  private head = this.getHeaders().headers;

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
    getClubs(){
      this.http.get<any>(`http://localhost:3000/api/allclub/getAllClub`,{headers:this.head}).subscribe(res=>{
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
      clubData.append('club_id',club._id);
      clubData.append('title',club.title);
      clubData.append('description',club.description);
      clubData.append('image',club.image);

      this.http.put(`${this.API_URL}/${club._id}/clubs`,clubData,{headers:this.head})
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
      clubData.append('title',club.title);
      clubData.append('description',club.description);
      clubData.append('image',club.image);


      this.http.post(`${this.API_URL}/clubs`,clubData,{headers:this.head})
      .subscribe(res=>{
        const updatedclubs = [...this.clubs];
        updatedclubs.push(club);
        this.clubs = updatedclubs;
        this.clubUpdated.next([...this.clubs]);
      });
    }

    deleteClub(id:string){
      this.http.delete(`${this.API_URL}/${id}/clubs`,{headers:this.head})
      .subscribe(res=>{
        const updatedclubs = this.clubs.filter(c=>c.id !== id);
        this.clubs = updatedclubs;
        this.clubUpdated.next([...this.clubs]);

      });
    }
   


}

