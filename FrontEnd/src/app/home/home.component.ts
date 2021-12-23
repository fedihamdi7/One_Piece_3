import { Component, OnInit } from '@angular/core';

import { Club, Event, Home } from './home.model';
import { clubsList, homes } from './home-list';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public events : Event[] = homes;
  public clubs:Club[] = clubsList;


  constructor() { }

  ngOnInit(): void {


  }

}
