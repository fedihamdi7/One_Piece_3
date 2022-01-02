import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
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
  public userId = JSON.parse(localStorage.getItem('user')).userId;
  public title ="";
  public club_id;
  public image;

  constructor( private adminService:AdminUserService , private managerService : ManagerService ) { }

  ngOnInit(): void {
    //const club_id = JSON.parse(localStorage.getItem('user')).id;
    //this.club_id = club_id;
    this.adminService.getStats().subscribe((res:any)=>{
      this.usersCount = res.users;
      //this. clubsCount = res.teams;
      //this.title = res.title
    });
    this.adminService.getStatsclubs().subscribe((res:any)=>{
      this.clubsCount = res.clubs;
      //this. clubsCount = res.teams;
      //this.title = res.title
    });
    this.managerService.getUserImage(this.userId).subscribe((res:any)=>{
      this.image = res.user_img;
    });

  }

}
