import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challange-tile',
  templateUrl: './challange-tile.component.html',
  styleUrls: ['./challange-tile.component.scss']
})
export class ChallangeTileComponent implements OnInit {

  @Input() challange: any;
  // constructor() { }

  constructor(private requestService: RequestService,
    private router: Router
    ) { }
  activeChallenges: any[];
  pastChallenges: any[];

  ngOnInit() {
    console.log("challange ..... ", this.challange)
    
  }

  getDate(time) {
    time = parseInt(time);
    let dt = new Date(time);
    return dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
  }

  viewChalange(id) {
    console.log(id, "---view challenge btn click---")

    let url = 'challenge/' + id

    this.router.navigateByUrl(url);
    // let challengeUrl = '/challenge/:challengeId';
    // this.requestService.get(challengeUrl).subscribe(data => {
    //   console.log("active challange ... ", data)
    //   this.activeChallenges = data;
    // })

  }
}
