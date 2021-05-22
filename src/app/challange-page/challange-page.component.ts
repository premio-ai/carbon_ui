import { Component, OnInit, } from "@angular/core";
import { RequestService } from "../request.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: "app-challange-page",
	templateUrl: "./challange-page.component.html",
	styleUrls: ["./challange-page.component.scss"],
})
export class ChallangePageComponent implements OnInit {

	constructor(private requestService: RequestService,
		private router: Router,
		private location: Location) { }

	current: number;
	steps: any[];
	awardedTo = "60767631222df1253206ff74";

	challange: {
		title: string,
		description: string,
		Objective: string,
		expiryDate: string,
		visulizationImageFilePath: [
			string
		],
		sampleDataFilePath: [
			string
		],
		submissionsCount: 0,
		acceptedUsersCount: 0,
		challengeType: string,
		phases: any[],
		visibiltiy: {},
		isActive: true,
		witholdCompanyName: boolean,
		witholdCompanyDescription: boolean
	}


	ngOnInit() {
		this.steps = [
			{
				text: "Step 1",
				state: ["current"],
			},
			{
				text: "Step 2",
				state: ["incomplete"],
			},
			{
				text: "Step 3",
				state: ["incomplete"],
			},
			{
				text: "Step 4",
				state: ["incomplete"],
			},
			{
				text: "Step 5",
				state: ["incomplete"],
				disabled: true,
			},
		];
		this.current = 0;
		this.challange = {
			title: "",
			description: "",
			Objective: "",
			expiryDate: "",
			visulizationImageFilePath: [""],
			sampleDataFilePath: [""],
			submissionsCount: 0,
			acceptedUsersCount: 0,
			challengeType: "CONTRACT",
			phases: [],
			visibiltiy: {},
			isActive: true,
			witholdCompanyName: false,
			witholdCompanyDescription: false
		}
	}

	stepSelected() { }

	nextStep() {
		this.current++;
	}

	nextStepOne(stepOneData) {
		this.challange.title = stepOneData.title;
		this.challange.description = stepOneData.description;
		this.challange.Objective = stepOneData.objective;
		this.challange.expiryDate = new Date(stepOneData.endDate).toDateString();
		this.challange.witholdCompanyName = stepOneData.witholdCompanyName;
    	this.challange.witholdCompanyDescription = stepOneData.witholdCompanyDescription;
		this.current++;
	}

	previousStepTwo() {
		this.current--;
	}

	nextStepTwo(stepTwoData) {
		let phase = stepTwoData;
		this.challange.phases = phase;
		this.current++;
	}

	previousStepThree() {
		this.current--;
	}

	nextStepThree(stepThreeData) {
		let visibiltiy = {
			minPointEarned: stepThreeData.minEarnedPoint,
			maxPointEarned: stepThreeData.maxEarnedPoint,
			minChallenge: stepThreeData.minChallangeInvolved,
			maxChallenge: stepThreeData.maxChallangeInvolved,
			isActive: true,
			awarededTo: this.awardedTo,
			accountType: stepThreeData.typeOfUser,
			programmingLanguage: stepThreeData.programmingLanguage,
			confirmationDate: "2021-04-14T05:41:44.652Z",
			completedAt: "2021-04-14T05:41:44.652Z"
		}
		this.challange.visibiltiy = visibiltiy;
		this.current++;
	}

	previousStepFour() {
		this.current--;
	}

	nextStepFour() {
		this.requestService.post('challenge', this.challange).subscribe(res => {
			this.router.navigateByUrl('/')
		})
		this.current++;
	}

	navigateBack() {
		this.location.back()
	}

}
