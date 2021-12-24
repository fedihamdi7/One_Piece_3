import { Component, OnInit } from '@angular/core';
import { ManagerService } from "src/app/services/manager.service";
import { teams } from './team-list';
import { Team } from './team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public teamsList: any = [];
  public fetchedteam;
  // public teamsList:Team[]=teams;
  constructor(private managerService: ManagerService) {

  }

  ngOnInit(): void {
    // this.managerService.getTeam().subscribe(
    //   (resultat) => {
    //     this.fetchedteam = resultat;
    //   }
    // );
  }

}
