import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public username="molka"
  public users = [
    {
      id:"1",
      name: 'John Doe',
      user_img:"image",
      email: 'john.doe.gmail.com',
      type:'admin',
    
    },
    {
      id:"2",
      name: 'John Doe2',
      user_img:"image2",
      email: 'john.doe.gmail.com2',
      type:'admin',
    },
  ];
  constructor() { }


  ngOnInit(): void {
   
  }

}