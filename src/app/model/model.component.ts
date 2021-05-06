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
  compareModelData: any[]
  modelComparison: boolean

  // ngOnInit() {
  //   this.makeModelData()
  // }

  ngOnChanges() {
    this.makeModelData()
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

  selectModel(id) {

    console.log(id, "---id----52")

    let tempData = this.compareModelData
    console.log(tempData, "---tempData---56")
    this.modelData.find( dt => {
      if (dt._id == id) {
        tempData.push(dt)
      }
    })

    this.compareModelData = tempData

    console.log(this.compareModelData, "---this.compareModelData---60")
  }

  compareModels() {
    this.modelComparison = true
  }

}
