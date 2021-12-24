import { Component, OnInit } from '@angular/core';
import { AllClub } from './all-clubs.model';
import { AllClubs } from './all-clubs-list';
import { AllClubService } from '../services/allclub.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-all-clubs',
  templateUrl: './all-clubs.component.html',
  styleUrls: ['./all-clubs.component.css']
})
export class AllClubsComponent implements OnInit {
  public AllClubs : AllClub[] = AllClubs;
  public fetchedClubs;

  constructor(private allclubService : AllClubService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.allclubService.getAllClub().subscribe(
      (resultatAllClub) => {
        this.fetchedClubs = resultatAllClub;
      }
    );
  }

}
