import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-challange-fourth-step',
  templateUrl: './challange-fourth-step.component.html',
  styleUrls: ['./challange-fourth-step.component.scss']
})
export class ChallangeFourthStepComponent implements OnInit {
  @Output() public goPrevious: EventEmitter<any> = new EventEmitter();
  @Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor() { }

  

  ngOnInit() {
  }

  previous() {
    this.goPrevious.emit();
  }

  next() {
    this.goNext.emit();
  }
}
