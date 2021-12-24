import { Component, OnInit } from '@angular/core';
import { Club } from './club.model';
import { clubs } from './clubs-list';
import { ClubService } from '../services/club.service';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  public clubsList : Club[] = clubs;
  public fetchedClub;
  constructor(private clubService : ClubService) { }

  ngOnInit(): void {
    this.clubService.getOneClub().subscribe(
      (resultatClub) => {
        this.fetchedClub = resultatClub;
      }
    );
  
  }

}
