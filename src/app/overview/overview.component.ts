import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGES } from '../../config/config';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input() challengeDetails: any;
  @Input() submissionChallengeDetails: any
  constructor(
    private router: Router,
    private requestService: RequestService
  ) { }
  phaseOneSubmission: any
  phaseNo: number;
  selectedPhase: any
  leaderboardData: any[] = []
  modelUnderTraining: number;
  passedModelsCount: number;
  selectedPhaseId: string;
  topList: any;
  pageNo: number;
  pageOffset: number;
  totalPage: number;
  displayLeaderboardData: any;
  userSessionExpired: boolean;

  ngOnInit() {
    this.userSessionExpired = false;
    this.modelUnderTraining = 0;
    this.passedModelsCount = 0;
    this.pageNo = 1;
    this.pageOffset = 0;
    this.totalPage = 1;
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
    this.getLeaderboard(this.challengeDetails._id, this.selectedPhaseId, this.pageOffset);
  }

  selectPhase(phaseId, phaseNo) {
    this.phaseNo = phaseNo
    this.selectedPhaseId = phaseId
    this.getLeaderboard(this.challengeDetails._id, this.selectedPhaseId, this.pageOffset)
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

  getLeaderboard(challengeId, phaseId, pageOffset) {
		let url = 'leaderboard/' + challengeId + '/' + phaseId;
		let params = {
			skip: pageOffset
		}
		this.requestService.get(url, params).toPromise().then(data => {
			this.totalPage = Math.ceil(data.count / 10);
			this.leaderboardData = data.list;
		}).catch(err => {
			if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
        this.userSessionExpired = true
        setTimeout(() => {
          this.reLogin();
        }, 3000)
			}
		})
	}

  prevPage() {
		if (this.pageNo > 1) {
			this.pageNo--;
			this.pageOffset = (this.pageNo - 1) * 10;
			this.getLeaderboard(this.challengeDetails._id, this.selectedPhaseId, this.pageOffset)
		}
	}

	nextPage() {
		if (this.pageNo < (this.totalPage)) {
			this.pageNo++;
			this.pageOffset = (this.pageNo - 1) * 10;
			this.getLeaderboard(this.challengeDetails._id, this.selectedPhaseId, this.pageOffset)
		}
  }

  viewModel(id) {
    this.router.navigateByUrl('modelReport/' + id)
  }

  switchWithPhase(phaseId) {
    this.router.navigateByUrl('challenge/' + this.challengeDetails._id + '?activePhaseId=' + phaseId)
  }

  reLogin() {
    let id = JSON.parse(localStorage.getItem('timeoutId'))
		clearTimeout(id);
    localStorage.clear();
    this.router.navigateByUrl('login')
  }

}
