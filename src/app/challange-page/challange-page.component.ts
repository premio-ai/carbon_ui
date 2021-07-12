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
	errorToasterMsg: boolean;

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
		witholdCompanyDescription: boolean,
		categoryType: string
	}


	ngOnInit() {
		let userDetails = JSON.parse(localStorage.getItem('userDetails'))
		if (userDetails && userDetails._id) {

			this.steps = [
				{
					text: "Step 1",
					state: ["current"],
					optionalText: 'Overview'
				},
				{
					text: "Step 2",
					state: ["incomplete"],
					optionalText: 'Data & Testing'
				},
				{
					text: "Step 3",
					state: ["incomplete"],
					optionalText: 'Visibility'
				},
				{
					text: "Step 4",
					state: ["incomplete"],
					disabled: true,
					optionalText: 'Confirm'
				},
			];
			this.errorToasterMsg = false;
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
				challengeType: "",
				phases: [],
				visibiltiy: {},
				isActive: true,
				witholdCompanyName: false,
				witholdCompanyDescription: false,
				categoryType: ''
			}
		} else {
			this.router.navigateByUrl('')
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
		this.challange.challengeType = stepOneData.challengeType
		this.challange.categoryType = stepOneData.categoryType
		this.current++;
	}

	previousStepTwo() {
		this.current--;
	}

	nextStepTwo(stepTwoData) {
		this.challange.phases = stepTwoData;
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
		this.requestService.post('challenge', this.challange).toPromise().then(res => {
			this.router.navigateByUrl('dashboard')
		}).catch( err => {
			this.errorToaster();
		  })
		this.current++;
	}

	errorToaster = (() => {
		this.errorToasterMsg = true
		setTimeout(() => {
			this.errorToasterMsg = false
		}, 3000)
	})

	closeToaster() {
		this.errorToasterMsg = false
	}

	navigateToDashboard() {
		this.router.navigateByUrl('dashboard')
	}

	navigateBack() {
		this.location.back()
	}

}
