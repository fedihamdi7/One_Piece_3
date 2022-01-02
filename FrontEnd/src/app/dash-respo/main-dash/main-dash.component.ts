import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.css']
})
export class MainDashComponent implements OnInit {

  public eventsCount;
  public teamsCount;
  public userName = JSON.parse(localStorage.getItem('user')).name;
  public email = JSON.parse(localStorage.getItem('user')).email;
  public userId = JSON.parse(localStorage.getItem('user')).userId;
  public title ="";
  public club_id;
  public image;
  constructor( private managerService:ManagerService) { }

  ngOnInit(): void {
    const club_id = JSON.parse(localStorage.getItem('user')).club_id;
    this.club_id = club_id;
    this.managerService.getStats(club_id).subscribe((res:any)=>{
      this.eventsCount = res.events;
      this.teamsCount = res.teams;
      this.title = res.title
    });

    this.managerService.getUserImage(this.userId).subscribe((res:any)=>{
      this.image = res.user_img;
    });

  }
}
