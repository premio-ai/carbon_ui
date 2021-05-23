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
  phaseNo: number;
  selectedPhase: any
  leaderboardData: any[] = []

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.challengeDetails && this.submissionChallengeDetails) {
      this.phaseOneSubmission = this.submissionChallengeDetails.length
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
    this.showLeaderboard()
  }

  selectPhase(phaseId, phaseNo) {
    this.phaseNo = phaseNo

    this.selectedPhase = []
    let tempData = []
    this.submissionChallengeDetails.filter(dt => {
      this.challengeDetails.phases.map(res => {
        if (dt.phaseId == phaseId && res.phaseId == phaseId) {
          tempData.push(dt)
        }
      })
    })

    this.selectedPhase = tempData
    this.showLeaderboard()
  }

  showLeaderboard() {
    let tempData = []
    this.submissionChallengeDetails.filter( dt => {
      if (dt.phaseid == this.selectedPhase.phaseId) {
        tempData.push(dt)
      }
    })

    this.leaderboardData = tempData
  }
  
}
