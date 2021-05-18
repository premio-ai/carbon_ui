import { temporaryDeclaration } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
// export class ModelComponent implements OnInit {

export class ModelComponent {

  @Input() submissionChallengeDetails: any[];
  @Input() challengeDetails: any;
  constructor(
    private requestService: RequestService
  ) { }
  bookmarkedSubmissions: any[] = []
  modelData: any[]
  phaseId: any
  compareModelData: any[] = []
  modelComparison: boolean
  readmore: boolean

  // ngOnInit() {
  //   this.getBookmarkedSubmission()
  // }

  ngOnChanges() {
    if (this.challengeDetails && this.submissionChallengeDetails) {
      this.makeModelData()
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
    this.challengeDetails.phases.map(dt => {
      this.submissionChallengeDetails.map(res => {
        if (res.phaseId == dt.phaseId) {
          data.push(res)
        }
      })
    })
    this.modelData = data
  }

  handlePhaseClick(id) {
    this.phaseId = id
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

  bookmark(model) {
    let url = 'bookmarksubmission'
    let data = {
      challengeId: model.challengeId,
      phaseId: model.phaseId,
      innovatorId: model.innovatorId._id,
      submissionId: model._id,
      insurerId: ''
    }
    this.requestService.post(url, data).subscribe(data => {
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

  readMore() {
    console.log(this.readmore, "---this.readmore---81")
    this.readmore = true
    console.log(this.readmore, "---this.readmore---83")
  }

}