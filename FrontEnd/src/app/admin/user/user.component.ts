import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { users } from './users-list';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public username="molka"
  public usersList : User[] = users;
  constructor() { }


  ngOnInit(): void {
   
  }

}