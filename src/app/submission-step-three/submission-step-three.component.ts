import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-submission-step-three',
  templateUrl: './submission-step-three.component.html',
  styleUrls: ['./submission-step-three.component.scss']
})
export class SubmissionStepThreeComponent implements OnInit {
  @Input() isChallengeAccepted: boolean;
  @Output() public goPrevious: EventEmitter<any> = new EventEmitter();
  @Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor() { }
  
  stepThree: {
    description: string,
    guidence: string,
    score: number
  }


  ngOnInit() {
    this.stepThree=  {
      description: "",
      guidence: "",
      score: 0
    }
  }

  previous() {
    this.goPrevious.emit();
  }

  next() {
    this.goNext.emit(this.stepThree);
  }


}
