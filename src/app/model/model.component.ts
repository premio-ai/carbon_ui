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

  onChange(e, id) {

    console.log(e, id, "---id----52")

    let tempData = [...this.compareModelData]
    // this.modelData.find( dt => {
    //   if (dt._id == id) {
    //     tempData.push(dt)
    //   }
    // })

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

    console.log(tempData, "---tempData---56")

    // console.log(temp, "---temp---82")
    this.compareModelData = temp

    console.log(this.compareModelData, "---this.compareModelData---60")
  }

  compareModels() {
    this.modelComparison = true
  }

}
