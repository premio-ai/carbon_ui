import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-inv-challenge-tile',
  templateUrl: './inv-challenge-tile.component.html',
  styleUrls: ['./inv-challenge-tile.component.scss']
})
export class InvChallengeTileComponent implements OnInit {

  @Input() challenge: any;
  @Input() submissionRanking: any;
  @Input() submittedChallenges: any;

  constructor(private requestService: RequestService,
    private router: Router
  ) { }
  userId: String;

  ngOnInit() {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'))
    this.userId = userDetails._id
  }

  getDate(time) {
    time = parseInt(time);
    let dt = new Date(time);
    return dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
  }

  getPhaseCount(challenge) {
    let numPhases = challenge.phases.length

    let count = 0
    if (this.submittedChallenges && this.submittedChallenges.length) {
      this.submittedChallenges.find(dt => {
        if (dt.challengeId == challenge._id && dt.innovatorId == this.userId) {
          count += 1
        }
      })
    }
    return `Phases ${count} of ${numPhases}`
  }

  getStatus(challenge) {
    let count = 0
    if (this.submittedChallenges && this.submittedChallenges.length) {
      this.submittedChallenges.find(dt => {
        if (dt.challengeId == challenge._id) {
          count += 1
        }
      })
    }
    if (count < 2) {
      return true
    } else if (count >= 2) {
      return false
    }
  }

  getPlace(challengeId) {
    if (this.submissionRanking) {
      let data = this.submissionRanking.find( dt => {
        if (dt.challengeId == challengeId) {
          return dt
        }
      })
  
      if (data) {
        if (data.rank == 1) {
          return '1st place';
        } else if (data.rank == 2) {
          return '2nd place';
        } else if (data.rank == 3) {
          return '3rd place';
        } else {
          return '4th place';
        }
      }
    }
  }

  getExpiryDate(dt) {
    let date = moment(dt).format('DD/MM/YYYY')
    return date;
  }

  viewChalange(id) {
    let url = 'invaccepted/' + id
    this.router.navigateByUrl(url);
  }

}
