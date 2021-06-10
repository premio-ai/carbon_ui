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
  selectedPhaseId: string

  ngOnInit() {
    this.modelUnderTraining = 0
    this.passedModelsCount = 0

    // $(document.getElementsByClassName('bx--tabs__nav-item')[0].click())
  }

  // ngAfterViewInit() {
  //     // active
  //     document.getElementById('n-tab-2').setAttribute('style', `display:none;`);

  //     document.getElementsByClassName('bx--tabs__nav-item')[0].classList.remove('bx--tabs__nav-item--selected')
  //     document.getElementsByClassName('bx--tabs__nav-item')[2].classList.add('bx--tabs__nav-item--selected')

  //     //Inactive
  //     document.getElementById('n-tab-0').setAttribute('style', '');
  //     // document.getElementById('n-tab-1').setAttribute('style', `display:none;`);
  //     // document.getElementById('n-tab-3').setAttribute('style', `display:none;`);
  //     // document.getElementById('n-tab-4').setAttribute('style', `display:none;`);
    
  // }

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

  // switchToActivity() {
  //   this.router.navigateByUrl('challenge/' + this.challengeDetails._id + '?activeTab=Activity')
  // }

  // switchToModel() {
  //   this.router.navigateByUrl('challenge/' + this.challengeDetails._id + '?activeTab=Model')
  // }

}
