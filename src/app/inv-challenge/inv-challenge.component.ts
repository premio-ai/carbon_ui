import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    let userDetails = JSON.parse(localStorage.getItem('userDetails'))
		if (userDetails && userDetails._id) {			
	    this.getAllActiveChallanges();
      // this.getBookmarkedChallenges();
    } else {
			this.router.navigateByUrl('login')
		}
  }

  getDate(timeStamp) {
    let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
    return date;
  }

  getExpiryDate(dt) {
    let date = moment(dt).format('DD/MM/YYYY')
    return date;
  }

  getAllActiveChallanges() {
    let allActiveChallanegUrl = "challenge/all";
    this.requestService.get(allActiveChallanegUrl).subscribe(data => {
      this.activeChallenges = data;
      this.getBookmarkedChallenges();
    })
  }

  getBookmarkedChallenges() {
    let url = "bookmarkChallenge";
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
      challengeId: challengeId
    }
    this.requestService.post(url, data).subscribe(data => {
      this.getBookmarkedChallenges()
    })
  }

}