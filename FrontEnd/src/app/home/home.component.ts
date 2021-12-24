import { Component, OnInit } from '@angular/core';

import { Club, Event, Home } from './home.model';
import { clubsList, homes } from './home-list';
import { HomeService } from '../services/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public events : Event[] = homes;
  public clubs:Club[] = clubsList;

  public fetchedEvents ;
  public fetchedClub;
  constructor(private homeService : HomeService) {

  }

  ngOnInit(): void {
    this.homeService.getLatestEvents().subscribe(
      (resultat) => {
        this.fetchedEvents = resultat;
      }
    );

    this.homeService.getClub().subscribe(
      (resultatClub) => {
        this.fetchedClub = resultatClub;
      }
    );
  }

}
