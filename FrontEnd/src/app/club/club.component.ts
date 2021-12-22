import { Component, OnInit } from '@angular/core';
import { Club } from './club.model';
import { clubs } from './clubs-list';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  public clubsList : Club[] = clubs;

  constructor() { }

  ngOnInit(): void {
  }

}
