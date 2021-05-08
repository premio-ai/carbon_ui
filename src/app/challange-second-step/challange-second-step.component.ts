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
  phases: any[] = []
  phasesError: boolean

  stepTwo: {
    description: string,
    guidence: string,
    score: number
  }

  ngOnInit() {
    this.stepTwo = {
      description: "",
      guidence: "",
      score: 0
    }
  }

  addPhase() {
    let tempData = {
      description: this.stepTwo.description,
      guidence: this.stepTwo.guidence,
      score: this.stepTwo.score
    }

    this.phases.push(tempData)
    this.stepTwo = {
      description: "",
      guidence: "",
      score: 0
    }
  }

  previous() {
    this.goPrevious.emit();
  }

  next() {

    if (this.phases.length>0) {      
      this.goNext.emit(this.phases);
    } else  {
      this.phasesError = true
    }
  }

}