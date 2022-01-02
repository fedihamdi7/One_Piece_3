import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../admin/user/user.model';


@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private UsersList:User[];
  private userUpdated = new Subject<User[]>();
  private head = this.getHeaders().headers;

  constructor(private http:HttpClient) { }

  API_URL: string = 'http://localhost:3000/api/admin_user';
 
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


  getUsers(){
    
    return this.http.get<any>(`${this.API_URL}/getUsers`,{headers:this.head});
  }


  getUser(id:String){
    return this.http.get(`http://localhost:3000/api/admin_user/getOneUser/`+id,{headers:this.head});
    
    }
     getupdatedUserListener(){
       return this.userUpdated.asObservable();
     }


     addUser(user:User){
      const userData = new FormData();
      userData.append('name',user.name);
      userData.append('email',user.email);
      userData.append('password',user.password);
      userData.append('type',user.type);
      userData.append('user_img',user.user_img);

    //  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);

      //console.log(userData);
       this.http.post(`http://localhost:3000/api/admin_user/addUser`,userData,{headers:this.head})
       .subscribe(res=>{
         console.log(res);


      });
    }

    EditUser(user:User,id:string){

      const userData = new FormData();
      userData.append('name',user.name);
      userData.append('email',user.email);
      userData.append('type',user.type);
      userData.append('user_img',user.user_img);

    //  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);

      //console.log(userData);
       this.http.put(`http://localhost:3000/api/admin_user/editUser/`+id,userData,{headers:this.head})
       .subscribe(res=>{
         console.log(res);


      }); 
    }
DeleteUser(id:string){
  this.http.delete(`http://localhost:3000/api/admin_user/${id}/deleteuser`,{headers:this.head})
  .subscribe(res=>{
    console.log(res);


 }); 
}
   //////////////////////////////////////// Stats ////////////////////////////////////////

   getStats(){
    return this.http.get(`http://localhost:3000/api/admin_user/stats`,{headers:this.head});

  }
  getStatsclubs(){

    return this.http.get(`http://localhost:3000/api/admin_user/statsclubs`,{headers:this.head});
  }

}