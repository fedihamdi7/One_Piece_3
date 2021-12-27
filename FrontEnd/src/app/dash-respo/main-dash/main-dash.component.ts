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

  constructor( private managerService:ManagerService) { }

  ngOnInit(): void {
    const club_id = JSON.parse(localStorage.getItem('user')).club_id;
    this.managerService.getStats(club_id).subscribe((res:any)=>{
      this.eventsCount = res.events;
    });
  }

}
