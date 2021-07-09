import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
  selectedPhaseId: string;
  topList: any

  ngOnInit() {
    this.modelUnderTraining = 0
    this.passedModelsCount = 0
  }

  ngOnChanges() {
    if (this.challengeDetails && this.submissionChallengeDetails) {
      this.phaseOneSubmission = this.submissionChallengeDetails.length
      this.initialPhase();

      this.topList = this.submissionChallengeDetails
      this.topList.sort((a, b) => {
        return b.score - a.score
      })
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
    }
    return count;
  }

  trainingModels(phaseId) {
    let count = 0;
    if (this.submissionChallengeDetails) {
      this.submissionChallengeDetails.find(dt => {
        if (dt.phaseId == phaseId) {
          count += 1
        }
      })
    }
    return count;
  }

  modelPassed(phaseId) {
    let count = 0;
    if (this.submissionChallengeDetails) {
      let phaseIndex = this.challengeDetails.phases.findIndex( dt => {
        if (dt.phaseId == phaseId) {
          return true
        }
      })
      this.submissionChallengeDetails.find((dt, i) => {
        if (dt.phaseId == phaseId && dt.score >= this.challengeDetails.phases[phaseIndex].passingScore) {
          count += 1
        }
      })
    }
    return count;
  }

  getTopList(phaseId) {
    if (this.topList && this.topList.length>0) {
      let list = this.topList.filter( dt => {
        if (dt.phaseId == phaseId) {
          return true;
        }
      })
      return list;
    } else {
      return [];
    }
  }

  showLeaderboard() {
    let tempData = []
    this.submissionChallengeDetails.filter(dt => {
      if (dt.phaseId == this.selectedPhaseId) {
        tempData.push(dt)
      }
    })

    tempData.sort((a, b) => {
      return b.score - a.score
    })
    
    this.leaderboardData = tempData
  }

  viewModel(id) {
    this.router.navigateByUrl('modelReport/' + id)
  }

  switchWithPhase(phaseId) {
    this.router.navigateByUrl('challenge/' + this.challengeDetails._id + '?activePhaseId=' + phaseId)
  }

}
