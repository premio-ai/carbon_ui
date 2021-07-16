import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import * as moment from 'moment';
import { MESSAGES } from '../../config/config';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})

export class ModelComponent {

  @Input() submissionChallengeDetails: any[];
  @Input() challengeDetails: any;
  @Input() routePhase: any;
  constructor(
    private router: Router,
    private requestService: RequestService
  ) { }
  bookmarkedSubmissions: any[] = []
  modelData: any[]
  bookmarkedSubmissionsByPhase: any[] = []
  selectedPhaseId: any
  compareModelData = {}
  modelComparison: boolean
  showLess: boolean
  sorting: any[]
  selectedPhaseNo: number;
  columnIndex = {};
  isApiLoading: boolean;
  loadIndex: number;
  objectKeys = Object.keys;
  errorToasterMsg: boolean;
  userSessionExpired: boolean;
  pageNo: number;
  pageOffset: number;
  totalPage: number;
  displayModelData: any;

  ngOnInit() {
    this.pageNo = 1;
    this.pageOffset = 0;
    this.totalPage = 1;
    this.showLess = true;
    this.loadIndex = -1;
    this.errorToasterMsg = false;
    this.userSessionExpired = false;
    this.sorting = [
      { content: 'Newest' },
      { content: 'Oldest' },
      { content: 'Innovator Name (A-Z)' },
      { content: 'Model Score' },
      { content: 'Accuracy' }
    ];
  }

  ngOnChanges() {
    if (this.challengeDetails && this.submissionChallengeDetails) {
      if (this.routePhase) {
        this.handlePhaseClick(this.routePhase.phaseId)
      } else {
        this.makeInitialModelData()
        this.getBookmarkedSubmission()
      }
    }
  }

  getDate(timeStamp) {
    let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
    return date;
  }

  makeModelData() {
    let data = []
    this.challengeDetails.phases.map((dt, i) => {
      this.submissionChallengeDetails.map(res => {
        if (res.phaseId == dt.phaseId) {
          data.push(res)
        }
      })
    })
    this.modelData = data
    this.totalPage = Math.ceil((this.modelData.length)/10)
    this.getDisplayModelData();
  }
  
  getDisplayModelData() {
    this.pageOffset = (this.pageNo - 1) * 10;
    this.displayModelData = this.modelData.slice(this.pageOffset, this.pageOffset+10)
  }

  prevPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.getDisplayModelData();
    }
  }

  nextPage() {
    if (this.pageNo < (this.totalPage)) {
      this.pageNo++;
      this.getDisplayModelData();
    }
  }

  makeInitialModelData() {
    this.handlePhaseClick(this.challengeDetails.phases[0].phaseId)
  }

  checked(phaseId) {
    let checked = false;
    if (phaseId == this.selectedPhaseId) {
      checked = true
    } else {
      checked = false
    }
    return checked
  }

  makeModelDataByPhase() {
    let data = []
    this.challengeDetails.phases.map(dt => {
      this.submissionChallengeDetails.map(res => {
        if (res.phaseId == dt.phaseId && dt.phaseId == this.selectedPhaseId) {
          data.push(res)
        }
      })
    })
    this.modelData = data

    this.totalPage = Math.ceil((this.modelData.length)/10)
    this.getDisplayModelData();
  }

  handlePhaseClick(id) {
    this.selectedPhaseId = id
    this.selectedPhaseNo = this.challengeDetails.phases.findIndex(dt => {
      return dt.phaseId == id
    })
    this.makeModelDataByPhase()
    this.getBookmarkedSubmission()
  }

  getPhaseAvgScore(modelId) {
    let score = 0;
    if (this.modelData) {
      this.modelData.filter( dt => {
        if (dt._id == modelId) {
          score = Math.ceil( (dt.score + dt.precisionScore + dt.recallScore) / 3)
        }
      })
    }
    return score;
  }

  sortSelect(sort) {
    let criteria = sort.item.content;

    if (criteria == 'Newest') {
      this.displayModelData.sort((a, b) => {
        return b.createdAt - a.createdAt
      })
    }
    if (criteria == 'Oldest') {
      this.displayModelData.sort((a, b) => {
        return a.createdAt - b.createdAt
      })
    }
    if (criteria == 'Innovator Name (A-Z)') {
      this.displayModelData.sort((a, b) => {
        return a.innovatorId.fullName - b.innovatorId.fullName
      })
    }
    if (criteria == 'Model Score') {
      this.displayModelData.sort((a, b) => {
        let aScore = this.getPhaseAvgScore(a._id);
        let bScore = this.getPhaseAvgScore(b._id);
        return bScore - aScore
      })
    }
    if (criteria == 'Accuracy') {
      this.displayModelData.sort((a, b) => {
        return b.score - a.score
      })
    }
  }

  getBookmarkedSubmission() {
    let url = 'bookmarksubmission'
    this.requestService.get(url, null).toPromise().then(data => {
      let tempData = [];
      this.submissionChallengeDetails.map(dt => {
        data.filter(res => {
          if (dt.challengeId == res.challengeId && dt._id == res.submissionId && dt.phaseId == this.selectedPhaseId) {
            tempData.push(dt)
          }
        })
      })
      this.bookmarkedSubmissionsByPhase = tempData
    }).catch(err => {
      if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
        this.userSessionExpired = true
        setTimeout(() => {
          this.reLogin();
        }, 3000)
      }
    })
  }

  isBookmarked(modelId) {
    if (this.bookmarkedSubmissionsByPhase.length > 0) {
      let result = this.bookmarkedSubmissionsByPhase.some(dt => {
        if (dt._id == modelId) {
          return true;
        } else {
          return false;
        }
      })
      return result;
    } else {
      return false
    }
  }

  bookmark(modelId, index) {
    this.isApiLoading = true
    this.loadIndex = index
    let payload = {}
    this.modelData.filter(dt => {
      if (dt._id == modelId) {
        payload = {
          challengeId: dt.challengeId,
          phaseId: dt.phaseId,
          innovatorId: dt.innovatorId._id,
          submissionId: dt._id,
          insurerId: ''
        }
      }
    })

    let url = 'bookmarksubmission'
    this.requestService.post(url, payload).toPromise().then(data => {
      this.loadIndex = -1;
      this.isApiLoading = false;
      this.getBookmarkedSubmission()
    }).catch(err => {
      this.errorToaster();
      if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
        this.userSessionExpired = true
        setTimeout(() => {
          this.reLogin();
        }, 3000)
      }
    })
  }

  errorToaster = (() => {
    this.errorToasterMsg = true
    setTimeout(() => {
      this.errorToasterMsg = false
    }, 3000)
  })

  closeToaster() {
    this.errorToasterMsg = false
  }

  unBookmark(model, index) {
    this.isApiLoading = true;
    this.loadIndex = index
    let url = 'bookmarksubmission'
    let data = {
      challengeId: model.challengeId,
      phaseId: model.phaseId,
      innovatorId: model.innovatorId._id,
      submissionId: model._id,
      insurerId: ''
    }
    this.requestService.put(url, data).toPromise().then(data => {
      this.loadIndex = -1;
      this.isApiLoading = false;
      this.getBookmarkedSubmission()
    }).catch(err => {
      this.errorToaster();
      if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
        this.userSessionExpired = true
        setTimeout(() => {
          this.reLogin();
        }, 3000)
      }
    })
  }

  checkLoading(i) {
    if (this.loadIndex == i) {
      return true
    } else {
      return false
    }
  }

  onChange(e, id) {
    let tempData = []
    let ids = []
    if (this.compareModelData && this.compareModelData[this.selectedPhaseNo]) {
      tempData = [...this.compareModelData[this.selectedPhaseNo]]
      ids = tempData.map(dt => {
        return dt._id
      })
    }

    this.compareModelData[this.selectedPhaseNo] = this.modelData.filter(dt => {
      if (dt._id == id) {
        if (ids.includes(id)) {
          return false
        } else {
          return true
        }
      } else if (ids.includes(dt._id)) {
        return true
      } else {
        return false
      }
    })

  }

  checkSelected(modelId) {
    let isChecked = false;
    if (this.compareModelData && this.compareModelData[this.selectedPhaseNo] && this.compareModelData[this.selectedPhaseNo].length > 0) {
      this.compareModelData[this.selectedPhaseNo].map(dt => {
        if (dt._id == modelId) {
          isChecked = true;
        }
      })
    }

    return isChecked;
  }

  compareModels() {
    if (this.compareModelData[this.selectedPhaseNo].length > 1) {
      this.modelComparison = true
    }
  }

  viewModelReport(modelId) {
    this.router.navigateByUrl('modelReport/' + modelId)
  }

  readMore(ind) {
    this.columnIndex[ind] = true
  }

  readLess(ind) {
    this.columnIndex[ind] = false
  }

  showLessStr(str) {
    return str.substring(0, 100)
  }

  checkColumnIndex(ind) {
    return this.columnIndex[ind]
  }

  reLogin() {
    let id = JSON.parse(localStorage.getItem('timeoutId'))
		clearTimeout(id);
    localStorage.clear();
    this.router.navigateByUrl('login')
  }

}