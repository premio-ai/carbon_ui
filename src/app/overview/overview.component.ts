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
  modelUnderTraining: number;
  passedModelsCount: number;

  ngOnInit() {
    this.modelUnderTraining = 0
    this.passedModelsCount = 0
  }

  ngOnChanges() {
    if (this.challengeDetails && this.submissionChallengeDetails) {
      this.phaseOneSubmission = this.submissionChallengeDetails.length
      this.initialPhase();
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

  modelsUploaded(phaseId) {
    let count = 0;
    if (this.submissionChallengeDetails) {
      this.submissionChallengeDetails.find(dt => {
        if (dt.phaseId == phaseId) {
          count += 1
        }
      })
      return count;
    }
  }

  trainingModels(phaseId) {
    let count = 0;
    if (this.submissionChallengeDetails) {
      this.submissionChallengeDetails.find(dt => {
        if (dt.phaseId == phaseId) {
          count += 1
        }
      })
      return count;
    }
  }

  modelPassed(phaseId) {
    let count = 0;
    if (this.submissionChallengeDetails) {
      this.submissionChallengeDetails.find(dt => {
        if (dt.phaseId == phaseId && dt.score >= this.challengeDetails.phases[this.phaseNo].passingScore) {
          count += 1
        }
      })
      return count;
    }
  }

  showLeaderboard() {
    let tempData = []
    this.submissionChallengeDetails.filter(dt => {
      if (dt.phaseid == this.selectedPhase.phaseId) {
        tempData.push(dt)
      }
    })

    this.leaderboardData = tempData
  }

}
