import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import * as moment from 'moment';

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
  selectedPhaseNo: number
  objectKeys = Object.keys;

  ngOnInit() {
    this.showLess = true;
    this.sorting = [
      { content: 'Most Popular' },
      { content: 'Least Popular' },
      { content: 'Newest' },
      { content: 'Oldest' },
      { content: 'End Date' }
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
  }

  handlePhaseClick(id) {
    this.selectedPhaseId = id
    this.selectedPhaseNo = this.challengeDetails.phases.findIndex(dt => {
      return dt.phaseId == id
    })
    this.makeModelDataByPhase()
    this.getBookmarkedSubmission()
  }

  sortSelect(sort) {
    let criteria = sort.item.content;

    if (criteria == 'Newest') {
      this.modelData.sort((a, b) => {
        return b.createdAt - a.createdAt
      })
    }
    if (criteria == 'Oldest') {
      this.modelData.sort((a, b) => {
        return a.createdAt - b.createdAt
      })
    }
    if (criteria == 'End Date') {
      this.modelData.sort((a, b) => {
        return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
      })
    }
    if (criteria == 'Most Popular') {
      this.modelData.sort((a, b) => {
        return b.acceptedUsersCount - a.acceptedUsersCount
      })
    }
    if (criteria == 'Least Popular') {
      this.modelData.sort((a, b) => {
        return a.acceptedUsersCount - b.acceptedUsersCount
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
      localStorage.clear();
      this.router.navigateByUrl('login')
    })
  }

  isBookmarked(modelId) {
    if (this.bookmarkedSubmissions.length > 0) {
      let result = this.bookmarkedSubmissions.some(dt => {
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

  bookmark(modelId) {
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
      this.getBookmarkedSubmission()
    }).catch(err => {
      localStorage.clear();
      this.router.navigateByUrl('login')
    })
  }

  unBookmark(model) {
    let url = 'bookmarksubmission'
    let data = {
      challengeId: model.challengeId,
      phaseId: model.phaseId,
      innovatorId: model.innovatorId._id,
      submissionId: model._id,
      insurerId: ''
    }
    this.requestService.put(url, data).toPromise().then(data => {
      this.getBookmarkedSubmission()
    }).catch(err => {
      localStorage.clear();
      this.router.navigateByUrl('login')
    })
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

  compareModels() {
    if (this.compareModelData[this.selectedPhaseNo].length > 1) {
      this.modelComparison = true
    }
  }

  viewModelReport(modelId) {
    this.router.navigateByUrl('modelReport/' + modelId)
  }

  readMore() {
    this.showLess = false
  }

  readLess() {
    this.showLess = true
  }

  showLessStr(str) {
    return str.substring(0, 100)
  }

}