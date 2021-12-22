import { Component, OnInit } from '@angular/core';
import { AllClub } from './all-clubs.model';
import { AllClubs } from './all-clubs-list';

@Component({
  selector: 'app-all-clubs',
  templateUrl: './all-clubs.component.html',
  styleUrls: ['./all-clubs.component.css']
})
export class AllClubsComponent implements OnInit {
  public AllClubs : AllClub[] = AllClubs;
  constructor() { }

  ngOnInit(): void {
  }

}
