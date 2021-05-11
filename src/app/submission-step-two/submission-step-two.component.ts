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
  language: any[];
  descriptionError: boolean;
  approachError: boolean;
  languageError: boolean;

  stepTwo: {
    description: string,
    approach: string,
    language: string
  }

  ngOnInit() {
    this.language = [
      { content: 'C' },
      { content: 'C++' },
      { content: 'Python' },
      { content: 'Java' },
    ];
    this.stepTwo=  {
      description: "",
      approach: "",
      language: ""
    }
  
  }

  selected(langaugeSelected) {
    this.stepTwo.language = langaugeSelected.item.content;
  }

  previous(){
    this.goPrevious.emit();
  }

  next(){
    console.log(this.stepTwo)

    if (this.stepTwo.description.length>0 && this.stepTwo.approach.length>0 && this.stepTwo.language.length>0) {
      this.goNext.emit(this.stepTwo);
    } else {
      if (this.stepTwo.description.length == 0) {
        this.descriptionError = true
      }
      if (this.stepTwo.approach.length == 0) {
        this.approachError = true
      }
      if (this.stepTwo.language.length == 0) {
        this.languageError = true
      }
    }

  }

}