import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-challane-third-step',
  templateUrl: './challane-third-step.component.html',
  styleUrls: ['./challane-third-step.component.scss']
})
export class ChallaneThirdStepComponent implements OnInit {
  @Output() public goPrevious: EventEmitter<any> = new EventEmitter();
  @Output() public goNext: EventEmitter<any> = new EventEmitter();
  language: any[];
  stepThree: {
    minEarnedPoint: number,
    maxEarnedPoint: number,
    minChallangeInvolved: number,
    maxChallangeInvolved: number,
    typeOfUser: string,
    programmingLanguage: string,

  }

  constructor() { }

  ngOnInit() {
    this.language = [
      { content: 'C' },
      { content: 'C++' },
      { content: 'Python' },
      { content: 'Java' },
    ];
    this.stepThree = {
      minEarnedPoint: 0,
      maxEarnedPoint: 0,
      minChallangeInvolved: 0,
      maxChallangeInvolved: 0,
      typeOfUser: "",
      programmingLanguage: "",

    }
  }

  previous() {
    this.goPrevious.emit();
  }

  next() {
    console.log(this.stepThree)
    this.goNext.emit(this.stepThree);
  }

  selected(langaugeSelected) {
    this.stepThree.programmingLanguage = langaugeSelected.item.content;
  }
  selectAccountType1(evt) {
    if (evt.checked) {
      this.stepThree.typeOfUser = "INDEPENDENT";
    }
  }
  selectAccountType2(evt) {
    if (evt.checked) { this.stepThree.typeOfUser = "STARTUP"; }
    console.log(evt)

  }
  selectAccountType3(evt) {
    if (evt.checked) { this.stepThree.typeOfUser = "BIG_FIRM"; }
    console.log(evt)
  }

  checkUserType(type){
    return false;
  }
}
