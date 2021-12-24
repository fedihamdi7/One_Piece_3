import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(private http:HttpClient) { }

  API_URL: string = 'http://localhost:3000/api/club';


  getOneClub(id:String){
    return this.http.get<any>(`${this.API_URL}/getOneClub/`+id);
  }

}