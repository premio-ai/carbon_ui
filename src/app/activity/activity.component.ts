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
  }

  selectPhase(phaseId, phaseNo) {
    this.phaseNo = phaseNo

    let tempData = []
    this.submissionChallengeDetails.filter( dt => {
      this.challengeDetails.phases.map( res => {
        if (dt.phaseId == phaseId && res.phaseId == phaseId) {
          tempData.push(dt)
        }
      })
    })

    this.selectedPhase = tempData
  }

}