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
  pointEarnedError: boolean
  challengeInvolvedError: boolean
  typeOfUserError: boolean
  programmingLanguageError: boolean
  minPointError: boolean
  minChallengeError: boolean

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
    this.goNext.emit(this.stepThree);
    // if (this.stepThree.minEarnedPoint > 0 && this.stepThree.maxEarnedPoint > this.stepThree.minEarnedPoint &&
    //   this.stepThree.minChallangeInvolved > 0 && this.stepThree.maxChallangeInvolved >= this.stepThree.minChallangeInvolved && 
    //   this.stepThree.typeOfUser.length>0 && this.stepThree.programmingLanguage.length>0) {
    //     this.goNext.emit(this.stepThree);
    // } else {
    //   if (!this.stepThree.minEarnedPoint || !this.stepThree.maxEarnedPoint) {
    //     this.pointEarnedError = true
    //   }
    //   if (this.stepThree.minEarnedPoint >= this.stepThree.maxEarnedPoint) {
    //     this.minPointError = true
    //   }
    //   if (!this.stepThree.minChallangeInvolved || !this.stepThree.maxChallangeInvolved) {
    //     this.challengeInvolvedError = true
    //   }
    //   if (this.stepThree.minChallangeInvolved > this.stepThree.maxChallangeInvolved) {
    //     this.minChallengeError = true
    //   }
    //   if (this.stepThree.typeOfUser.length == 0) {
    //     this.typeOfUserError = true
    //   }
    //   if (this.stepThree.programmingLanguage.length == 0) {
    //     this.programmingLanguageError = true
    //   }
    // }
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
