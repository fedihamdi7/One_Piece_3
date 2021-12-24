import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { users } from './users-list';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public username="molka"
  
  public usersList : User[] = users;
  public fetchedUser;
  constructor(private userService : AdminService) { }


  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (resultatUser) => {
        this.fetchedUser = resultatUser;
      }
    );
  }

}