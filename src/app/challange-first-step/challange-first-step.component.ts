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
