import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-submission-step-four',
  templateUrl: './submission-step-four.component.html',
  styleUrls: ['./submission-step-four.component.scss']
})
export class SubmissionStepFourComponent implements OnInit {

  @Output() public goPrevious: EventEmitter<any> = new EventEmitter();
  @Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor() { }
  stepFour: {
    description: string,
    guidence: string,
    score: number
  }


  ngOnInit() {
    this.stepFour=  {
      description: "",
      guidence: "",
      score: 0
    }
  }

  previous() {
    this.goPrevious.emit();
  }

  next() {
    console.log(this.stepFour)
    this.goNext.emit(this.stepFour);
  }

}