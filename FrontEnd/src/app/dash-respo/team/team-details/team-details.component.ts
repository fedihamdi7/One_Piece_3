import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { teams } from '../team-list';
import { Team } from '../team.model';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
public team?:Team;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const teamId=params.get("id");
      this.team=teams.find(t=>t.id==teamId);
    })
  }

}
