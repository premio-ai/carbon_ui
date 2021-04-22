import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private requestService : RequestService) { }
  activeChallenges : any[];
  pastChallenges : any[];
  

  ngOnInit() {
    this.getActiveChallanges();
    this.getpastChallanges();
  }

  getActiveChallanges(){
    let activeChallanegUrl = 'challenge?isActive=true';
    this.requestService.get(activeChallanegUrl).subscribe(data => {
      console.log("active challange ... ",data)
      this.activeChallenges = data;
    })
  }

  getpastChallanges(){
    let pastChallanegUrl = 'challenge?isActive=false';
    this.requestService.get(pastChallanegUrl).subscribe(data => {
      //console.log("active challange ... ",data)
      this.pastChallenges = data;
    })
  }
}
