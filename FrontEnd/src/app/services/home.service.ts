import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  API_URL: string = 'http://localhost:3000/api/home';

// http://localhost:3000/api/home/get

  getLatestEvents(){
    return this.http.get<{status,data}>(`${this.API_URL}/getLatestEvents`);
  }

}
