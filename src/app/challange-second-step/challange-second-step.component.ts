import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-challange-second-step',
  templateUrl: './challange-second-step.component.html',
  styleUrls: ['./challange-second-step.component.scss']
})
export class ChallangeSecondStepComponent implements OnInit {
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
