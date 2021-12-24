import { Component, OnInit } from '@angular/core';
import { Club } from './club.model';
import { clubs } from './clubs-list';
import { ClubService } from '../services/club.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  public clubsList : Club[] = clubs;
  public fetchedClub;
  constructor(private clubService : ClubService,private route:ActivatedRoute) { }

  ngOnInit(): void {
  

    this.route.paramMap.subscribe(params => {
      const eventId = params.get("id");
    this.clubService.getOneClub(eventId).subscribe(
      (resultatClub) => {
        this.fetchedClub = resultatClub;
     console.log(resultatClub);
      }
    );
    });
  
  }


}
