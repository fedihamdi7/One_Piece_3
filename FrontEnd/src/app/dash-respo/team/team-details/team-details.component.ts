import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { Team } from '../team.model';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private managerService:ManagerService) { }
public team?:Team;
  ngOnInit(): void {
    this.managerService.getTeamList();
    this.route.paramMap.subscribe(params=>{
      const teamId=params.get("id");
      this.managerService.getupdatedTeamListener()
      .subscribe(res => {

        const teamList = res;
        this.team = teamList.find(t=>t.id==teamId);
        console.log(res);
      })
    })
  }

}
