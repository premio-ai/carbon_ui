import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submission-step-four',
  templateUrl: './submission-step-four.component.html',
  styleUrls: ['./submission-step-four.component.scss']
})
export class SubmissionStepFourComponent implements OnInit {
  @Input() challengeSubmissionData: any;

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
  }

  previous() {
  }

  toStepOne() {
    this.goToStepOne.emit()
  }

  viewModel(modelId) {
    this.router.navigateByUrl('invmodel-view/' + modelId)
  }

}