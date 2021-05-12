import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input() challengeDetails: any;
  @Input() submissionChallengeDetails: any
  constructor() { }
  phaseOneSubmission: any

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.challengeDetails && this.submissionChallengeDetails) {
      // this.initialPhase()

      this.phaseOneSubmission = this.submissionChallengeDetails.length
    }
  }

  // initialPhase() {
  //   let tempData = []
  //   this.submissionChallengeDetails.filter(dt => {
  //     if (dt.phaseId == this.challengeDetails.phases[0].phaseId) {
  //       tempData.push(dt)
  //     }
  //   })

  //   this.selectedPhase = tempData
  // }

  // selectPhase(phaseId, phaseNo) {
  //   this.phaseNo = phaseNo

  //   let tempData = []
  //   this.submissionChallengeDetails.filter(dt => {
  //     this.challengeDetails.phases.map(res => {
  //       if (dt.phaseId == phaseId && res.phaseId == phaseId) {
  //         tempData.push(dt)
  //       }
  //     })
  //   })

  //   this.selectedPhase = tempData
  // }
  


}
