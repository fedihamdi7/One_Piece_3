import { Component, OnInit } from '@angular/core';
import { TeamService } from "src/app/services/team.service";
import { teams } from './team-list';
import { Team } from './team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public teamsList: any = [];

  // public teamsList:Team[]=teams;
  constructor(private teamService: TeamService) {

  }

  ngOnInit(): void {
    this.teamService.all().subscribe(
      res => this.teamsList = res
    );
  }

}
