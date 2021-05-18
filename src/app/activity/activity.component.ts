import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Input() submissionChallengeDetails: any;
  @Input() challengeDetails: any;
  constructor() { }
  selectedPhase: any[] = []
  phaseNo: any
  phaseOneSubmission: any

  ngOnInit() {
    this.phaseNo = 1
  }

  ngOnChanges() {
    console.log(this.challengeDetails, "---this.challengeDetails---23")
    if (this.challengeDetails && this.submissionChallengeDetails) {
      this.initialPhase()

      this.phaseOneSubmission = this.submissionChallengeDetails.length
    }
  }

  getCreationDate(dt) {
    let date = moment(dt).format('DD/MM/YYYY')
    return date;
  }

  getDate(timeStamp) {
		let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
		return date;
	}
  
  initialPhase() {
    let tempData = []
    this.submissionChallengeDetails.filter(dt => {
      if (dt.phaseId == this.challengeDetails.phases[0].phaseId) {
        tempData.push(dt)
      }
    })

    this.selectedPhase = tempData
  }

  selectPhase(phaseId, phaseNo) {
    this.phaseNo = phaseNo

    let tempData = []
    this.submissionChallengeDetails.filter(dt => {
      this.challengeDetails.phases.map(res => {
        if (dt.phaseId == phaseId && res.phaseId == phaseId) {
          tempData.push(dt)
        }
      })
    })

    this.selectedPhase = tempData
  }

}