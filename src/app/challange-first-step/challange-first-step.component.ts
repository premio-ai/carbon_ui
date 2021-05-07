import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-challange-first-step',
  templateUrl: './challange-first-step.component.html',
  styleUrls: ['./challange-first-step.component.scss']
})
export class ChallangeFirstStepComponent implements OnInit {
	@Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor() { }
  stepOne: {
    title: string,
    description: string,
    objective: string,
    endDate: string
  }
  titleError: boolean
  descriptionError: boolean
  objectiveError: boolean
  endDateError: boolean

  ngOnInit() {
    this.stepOne = {
      title: "",
      description: "",
      objective: "",
      endDate: ""
    };
  }

  nextStep() {
    console.log("... ",this.stepOne)

    var date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

    if (this.stepOne.title.length>0 && this.stepOne.description.length>0 && this.stepOne.objective.length>0 && this.stepOne.endDate.length>0) {
      this.goNext.emit(this.stepOne)
    } else {
      if (this.stepOne.title.length == 0) {
        this.titleError = true
      }
      if (this.stepOne.description.length == 0) {
        this.descriptionError = true
      }
      if (this.stepOne.objective.length == 0) {
        this.objectiveError = true
      }
      if (this.stepOne.endDate.length == 0 && !(date_regex.test(this.stepOne.endDate))) {
        this.endDateError = true
      }
    }
  }
}