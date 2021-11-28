import { Component, OnInit } from '@angular/core';
import { teams } from './team-list';
import { Team } from './team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  public teamsList:Team[]=teams;
  constructor() { }

  ngOnInit(): void {
  }

}
