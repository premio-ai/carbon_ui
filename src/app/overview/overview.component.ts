import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input() challengeDetails: any;
  @Input() submissionChallengeDetails: any
  constructor(
    private router: Router
  ) { }
  phaseOneSubmission: any
  phaseNo: number;
  selectedPhase: any
  leaderboardData: any[] = []
  modelUnderTraining: number;
  passedModelsCount: number;
  selectedPhaseId: string

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
    this.selectedPhaseId = this.challengeDetails.phases[0].phaseId
    this.showLeaderboard()
  }

  selectPhase(phaseId, phaseNo) {
    this.phaseNo = phaseNo
    this.selectedPhaseId = phaseId
    this.showLeaderboard()
  }

  checkSelected(phaseId) {
    let checked = false
    if (this.selectedPhaseId == phaseId) {
      checked = true
    } else {
      checked = false
    }
    return checked
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
      if (dt.phaseId == this.selectedPhaseId) {
        tempData.push(dt)
      }
    })

    this.leaderboardData = tempData
  }

  viewModel(id) {
    this.router.navigateByUrl('invmodel-view/' + id)
  }

}
