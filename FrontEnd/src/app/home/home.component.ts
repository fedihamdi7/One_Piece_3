import { Component, OnInit } from '@angular/core';

import { Event, Home } from './home.model';
import { homes } from './home-list';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public events : Event[] = homes;

  // public mokka= homes;

  constructor() { }

  ngOnInit(): void {
    console.log(this.events);

  }

}
