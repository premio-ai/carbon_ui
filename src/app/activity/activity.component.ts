import { Component, Input, OnInit } from '@angular/core';

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

  ngOnInit() {
    this.phaseNo = 1
  }

  ngOnChanges() {
    if (this.challengeDetails && this.submissionChallengeDetails) {
      this.initialPhase()
    }
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