import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-submission-step-one',
  templateUrl: './submission-step-one.component.html',
  styleUrls: ['./submission-step-one.component.scss']
})
export class SubmissionStepOneComponent implements OnInit {

  @Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor() { }
  stepOne: {
    title: string,
    description: string,
    objective: string,
    endDate: String
  }

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
    this.goNext.emit(this.stepOne)
  }



}
