import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-submission-step-two',
  templateUrl: './submission-step-two.component.html',
  styleUrls: ['./submission-step-two.component.scss']
})
export class SubmissionStepTwoComponent implements OnInit {
	@Output() public goPrevious: EventEmitter<any> = new EventEmitter();
	@Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor() { }

  stepTwo: {
    description: string,
    guidence: string,
    score: number
  }

  ngOnInit() {
    this.stepTwo=  {
      description: "",
      guidence: "",
      score: 0
    }
  
  }

  previous(){
    this.goPrevious.emit();
  }

  next(){
    console.log(this.stepTwo)
    this.goNext.emit(this.stepTwo);
  }
}
