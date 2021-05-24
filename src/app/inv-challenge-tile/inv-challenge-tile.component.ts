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

  constructor(private requestService: RequestService,
    private router: Router
  ) { }
  activeChallenges: any[];
  pastChallenges: any[];
  submittedChallenges: any[] = []
  userId: String;

  ngOnInit() {
let userDetails = JSON.parse(localStorage.getItem('userDetails'))
this.userId = userDetails._id
    this.getSubmittedChallenge()
  }

  getSubmittedChallenge() {
    let url = 'submissionAllChallenge'

    this.requestService.get(url, null).subscribe( data => {
      this.submittedChallenges = data
    })
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
      this.submittedChallenges.find( dt => {
        if (dt.challengeId == challenge._id && dt.innovatorId == this.userId) {
          count += 1
        }
      })      
    }
    return `Phases ${count} of ${numPhases}`
  }

  getStatus(challenge, status) {
    let numPhases = challenge.phases.length  
    
    let count = 0
    if (this.submittedChallenges && this.submittedChallenges.length) {      
      this.submittedChallenges.find( dt => {
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
    if (this.submittedChallenges && this.submittedChallenges.length) {
      let temp = this.submittedChallenges.find(dt => dt.challengeId == challengeId)

      if (temp.score > 90) {
        return '1st place'
      } else if (temp.score > 80) {
        return '2nd place'
      } else if (temp.score > 70) {
        return '3rd place'
      } else if (temp.score > 60) {
        return '4th place'
      } else if (temp.score > 50) {
        return '5th place'
      } else {
        return 'NA'
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
