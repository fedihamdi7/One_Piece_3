import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient) { }

  API_URL: string = 'http://localhost:3000/api/admin';


  getUsers(){
    return this.http.get<any>(`${this.API_URL}/getUsers`);
  }

}