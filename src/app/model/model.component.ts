import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})

export class ModelComponent {

  @Input() submissionChallengeDetails: any[];
  @Input() challengeDetails: any;
  constructor(
    private router: Router,
    private requestService: RequestService
  ) { }
  bookmarkedSubmissions: any[] = []
  modelData: any[]
  selectedphaseId: any
  compareModelData: any[] = []
  modelComparison: boolean
  readmore: boolean

  ngOnChanges() {
    if (this.challengeDetails && this.submissionChallengeDetails) {
      // this.makeModelData()
      this.makeInitialModelData()
      this.getBookmarkedSubmission()
    }
  }

  getDate(time) {
    time = parseInt(time);
    let dt = new Date(time);
    return dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
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

    this.selectedphaseId = this.challengeDetails.phases[0].phaseId

    this.handlePhaseClick(this.challengeDetails.phases[0].phaseId)

    // this.challengeDetails.phases.map((dt, i) => {
    //   this.submissionChallengeDetails.map(res => {
    //     if (res.phaseId == dt.phaseId) {
    //       data.push(res)
    //     }
    //   })
    // })
    // this.modelData = data
  }

  checked(phaseId) {
    if (phaseId == this.selectedphaseId) {
      return true
    } else {
      return false
    }
  }

  makeModelDataByPhase() {
    let data = []
    this.challengeDetails.phases.map(dt => {
      this.submissionChallengeDetails.map(res => {
        if (res.phaseId == dt.phaseId && dt.phaseId == this.selectedphaseId) {
          data.push(res)
        }
      })
    })
    this.modelData = data
  }

  handlePhaseClick(id) {
    this.selectedphaseId = id
    this.makeModelDataByPhase()
  }

  getBookmarkedSubmission() {
    let url = 'bookmarksubmission'
    this.requestService.get(url, null).subscribe(data => {
      let tempData = [];
      this.submissionChallengeDetails.map(dt => {
        data.filter(res => {
          if (dt.challengeId == res.challengeId) {
            tempData.push(dt)
          }
        })
      })
      this.bookmarkedSubmissions = tempData
    })
  }

  isBookmarked(modelId) {
    if (this.bookmarkedSubmissions.length > 0) {      
      let result = this.bookmarkedSubmissions.some( dt => {
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
        this.modelData.filter( dt => {
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
    this.requestService.post(url, payload).subscribe(data => {
      this.getBookmarkedSubmission()
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
    this.requestService.put(url, data).subscribe(data => {
      this.getBookmarkedSubmission()
    })
  }

  onChange(e, id) {
    let tempData = [...this.compareModelData]
    let ids = tempData.map(dt => {
      return dt._id
    })

    let temp = this.modelData.filter(dt => {
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
    this.compareModelData = temp
  }

  compareModels() {
    if (this.compareModelData.length > 1) {
      this.modelComparison = true
    }
  }

  viewModelReport(modelId) {
    this.router.navigateByUrl('modelReport/' + modelId)
  }

  readMore() {
    console.log(this.readmore, "---this.readmore---81")
    this.readmore = true
    console.log(this.readmore, "---this.readmore---83")
  }

}