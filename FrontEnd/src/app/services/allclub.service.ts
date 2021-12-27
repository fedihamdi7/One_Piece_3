import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllClubService {

  constructor(private http:HttpClient) { }

  API_URL: string = 'http://localhost:3000/api/allclub';


  getAllClub(){
    return this.http.get<any>(`${this.API_URL}/getAllClub`);
  }

}