import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-challange-first-step',
  templateUrl: './challange-first-step.component.html',
  styleUrls: ['./challange-first-step.component.scss']
})
export class ChallangeFirstStepComponent implements OnInit {
	@Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor() { }
  stepOne: {
    title: string,
    description: string,
    objective: string,
    categoryType: string,
    challengeType: string,
    endDate: string,
    witholdCompanyName: boolean,
    witholdCompanyDescription: boolean
  }
  titleError: boolean
  descriptionError: boolean
  objectiveError: boolean
  challengeTypeError: boolean
  categoryTypeError: boolean
  endDateError: boolean
  companyNameError: boolean
  companyDescriptionError: boolean
  category: any[]
  contractType: any[]

  ngOnInit() {
    this.stepOne = {
      title: "",
      description: "",
      objective: "",
      categoryType: "",
      challengeType: "",
      endDate: "",
      witholdCompanyName: false,
      witholdCompanyDescription: false
    };

    this.category = [
      { content: 'Efficiency' },
      { content: 'Claims' },
      { content: 'Customers' },
      { content: 'Bare Bones' },
    ]

    this.contractType = [
      { content: 'Contract' },
      { content: 'One Off' },
      { content: 'Other' }
    ]
  }

  toggle01() {
    this.stepOne.witholdCompanyName = !this.stepOne.witholdCompanyName
  }

  toggle02() {
    this.stepOne.witholdCompanyDescription = !this.stepOne.witholdCompanyDescription
  }

  selectCategory(category) {
    this.stepOne.categoryType = category.item.content
  }

  selectContract(type) {
    this.stepOne.challengeType = type.item.content
  }

  minDate() {
    return moment(new Date()).format('YYYY-MM-DD');
  }

  nextStep() {
    if (this.stepOne.title.length>0 && this.stepOne.description.length>0 && this.stepOne.objective.length>0
      && this.stepOne.categoryType.length>0 && this.stepOne.challengeType.length>0 && this.stepOne.endDate.length>0
      && moment(this.stepOne.endDate).isAfter(moment(new Date()).format('YYYY-MM-DD')) && this.stepOne.witholdCompanyName
      && this.stepOne.witholdCompanyDescription) {
      this.goNext.emit(this.stepOne)
    } else {
      this.validateData();
    }
  }

  validateData() {
    var date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

    if (this.stepOne.title.length == 0) {
      this.titleError = true
    } else {
      this.titleError = false
    }
    if (this.stepOne.description.length == 0) {
      this.descriptionError = true
    } else {
      this.descriptionError = false
    }
    if (this.stepOne.objective.length == 0) {
      this.objectiveError = true
    } else {
      this.objectiveError = false
    }
    if (this.stepOne.challengeType.length == 0) {
      this.challengeTypeError = true
    } else {
      this.challengeTypeError = false
    }
    if (this.stepOne.categoryType.length == 0) {
      this.categoryTypeError = true
    } else {
      this.categoryTypeError = false
    }
    if (this.stepOne.endDate.length == 0 || (date_regex.test(this.stepOne.endDate)) || moment(this.stepOne.endDate).isBefore(moment(new Date()).format('YYYY-MM-DD')) ) {
      this.endDateError = true
    } else {
      this.endDateError = false
    }
    if (this.stepOne.witholdCompanyName) {
      this.companyNameError = false
    } else {
      this.companyNameError = true
    }
    if (this.stepOne.witholdCompanyDescription) {
      this.companyDescriptionError = false
    } else {
      this.companyDescriptionError = true
    }
  }

}