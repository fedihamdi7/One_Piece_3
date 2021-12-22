import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../admin/user/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  authToken:any;
  user:any;
  constructor(private httpClient: HttpClient , private router:Router) { }

  signup(user: User): Observable<any> {

    return this.httpClient.post(`${this.API_URL}/auth/signup`, user).pipe(
        catchError(this.handleError)
    )
  }

  login(user: User): Observable<any> {
    //    return this.httpClient.post(`${this.API_URL}/auth/login`, user,{headers:this.headers}).pipe(
    //   catchError(this.handleError)
    // )
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.httpClient.post('http://localhost:3000/api/auth/login',user,{headers:headers}).pipe((res: any) => res);
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('id_token');
    return (authToken !== null) ? true : false;
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  storeUserData(token:string,user:any){
    this.authToken = token;
    this.user = user;
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
  }


  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}


