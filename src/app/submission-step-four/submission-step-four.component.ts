import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submission-step-four',
  templateUrl: './submission-step-four.component.html',
  styleUrls: ['./submission-step-four.component.scss']
})
export class SubmissionStepFourComponent implements OnInit {
  @Input() challengeSubmissionData: any;
  @Input() isChallengeAccepted: boolean;

  @Output() public goPrevious: EventEmitter<any> = new EventEmitter();
  @Output() public goNext: EventEmitter<any> = new EventEmitter();
  @Output() public goToStepOne: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router
  ) { }
  stepFour: {
    description: string,
    guidence: string,
    score: number
  }

  ngOnInit() {
    console.log(this.isChallengeAccepted, "---this.isChellengeAccepted")
  }

  previous() {
  }

  toStepOne() {
    this.goToStepOne.emit()
  }

  viewModel(modelId) {
    this.router.navigateByUrl('invmodel-view/' + modelId)
  }

  seePerformance(modelId) {
    this.router.navigateByUrl('see-performance/' + modelId)
  }

}