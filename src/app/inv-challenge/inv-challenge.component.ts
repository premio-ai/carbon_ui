import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { doesNotThrow } from 'assert';
import * as moment from 'moment';
import { RequestService } from "../request.service";

@Component({
  selector: 'app-inv-challenge',
  templateUrl: './inv-challenge.component.html',
  styleUrls: ['./inv-challenge.component.scss']
})

export class InvChallengeComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private router: Router
  ) { }
  activeChallenges: any[];
  bookmarkedChallenges: any[] = [];
  innovatorId = "607e856d2d00fd7ed549689e";

  ngOnInit() {
    this.getActiveChallanges();
    // this.getBookmarkedChallenges();
  }

  getDate(timeStamp) {
    let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
    return date;
  }

  getActiveChallanges() {
    let activeChallanegUrl = "challenge?isActive=true";
    this.requestService.get(activeChallanegUrl).subscribe(data => {
      this.activeChallenges = data;
      this.getBookmarkedChallenges();
    })
  }

  getBookmarkedChallenges() {
    let url = "bookmarkChallenge/" + this.innovatorId;
    this.requestService.get(url).subscribe(data => {

      let tempData = []
      this.activeChallenges.filter( dt => {
        data.map( res => {
          if (dt._id == res.challengeId) {
            tempData.push(dt)
          }
        })
      })
      this.bookmarkedChallenges = tempData;
    })
  }

  viewChallenge(challengeId) {
    this.router.navigateByUrl('invaccepted/' + challengeId)
  }

  bookmarkChallenge(challengeId) {
    let url = 'bookmarkChallenge'
    let data = {
      innovatorId: this.innovatorId,
      challengeId: challengeId
    }
    this.requestService.post(url, data).subscribe(data => {
      this.getBookmarkedChallenges()
    })
  }

}