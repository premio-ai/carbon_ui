import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
// export class ModelComponent implements OnInit {

export class ModelComponent {

  @Input() submissionChallengeDetails: any[];
  @Input() challengeDetails: any;
  constructor() { }
  modelData: any[]
  phaseId: any
  compareModelData: any[] = []
  modelComparison: boolean
  readmore: boolean

  // ngOnInit() {
  //   this.makeModelData()
  // }

  ngOnChanges() {
    if (this.challengeDetails && this.submissionChallengeDetails) {
      this.makeModelData()
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
