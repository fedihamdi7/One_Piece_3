import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { AllClub } from './all-clubs.model';
//import { AllClubs } from './all-clubs-list';
@Component({
  selector: 'app-all-clubs-details',
  templateUrl: './all-clubs-details.component.html',
  styleUrls: ['./all-clubs-details.component.css']
})
export class AllClubsDetailsComponent implements OnInit {
  //public allclub?:AllClub;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  /*  this.route.paramMap.subscribe(params => {
      const AllClubsId = params.get("id");
      this.allclub = AllClubs.filter(allclub =>allclub.id === AllClubsId)[0];
    });*/
  }
}
