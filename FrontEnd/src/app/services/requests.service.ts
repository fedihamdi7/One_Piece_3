import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private head = this.getHeaders().headers;
  private requests : any;
  public requestUpdated = new Subject<any>();
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

  getRequests(){
    this.http.get<any>(`http://localhost:3000/api/request/pending`,{headers:this.head}).subscribe(
      (resultat) => {
        this.requests = resultat;
        this.requestUpdated.next([...this.requests]);
      }
    );
  }

  getRequstsList() {
    return this.requests;
  }
  getRequestUpdateListener() {
    return this.requestUpdated.asObservable();
  }



  acceptRequest(user_id,club_id){
    this.http.put<any>(`http://localhost:3000/api/request/accept/${user_id}/${club_id}`,{headers:this.head}).subscribe(
      (resultat) => {
        console.log(resultat);
       }
    );
  }

  declineRequest(user_id,club_id){
    this.http.delete<any>(`http://localhost:3000/api/request/decline/${user_id}/${club_id}`,{headers:this.head}).subscribe(
      (resultat) => {


      }
    );
  }

}
