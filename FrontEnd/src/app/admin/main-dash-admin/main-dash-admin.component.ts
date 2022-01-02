import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../services/admin-user.service';

@Component({
  selector: 'app-main-dash-admin',
  templateUrl: './main-dash-admin.component.html',
  styleUrls: ['./main-dash-admin.component.css']
})
export class MainDashAdminComponent implements OnInit {


  public usersCount;
  public clubsCount;
  public userName = JSON.parse(localStorage.getItem('user')).name;
  public email = JSON.parse(localStorage.getItem('user')).email;
  public user_img= JSON.parse(localStorage.getItem('user')).user_img;
  public title ="";
  public club_id;
  constructor( private managerService:AdminUserService) { }

  ngOnInit(): void {
    //const club_id = JSON.parse(localStorage.getItem('user')).id;
    //this.club_id = club_id;
    this.managerService.getStats().subscribe((res:any)=>{
      this.usersCount = res.users;
      //this. clubsCount = res.teams;
      //this.title = res.title
    });
    this.managerService.getStatsclubs().subscribe((res:any)=>{
      this.clubsCount = res.clubs;
      //this. clubsCount = res.teams;
      //this.title = res.title
    });

  }

}
