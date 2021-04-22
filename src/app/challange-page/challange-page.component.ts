import { Component, OnInit, } from "@angular/core";
import { RequestService } from "../request.service";

@Component({
	selector: "app-challange-page",
	templateUrl: "./challange-page.component.html",
	styleUrls: ["./challange-page.component.scss"],
})
export class ChallangePageComponent implements OnInit {


	constructor(private requestService: RequestService) { }

	current: number;
	steps: any[];
	insurerId = "6076c19aad0c92991a8ba0bf"
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
		phases: [
			any
		],
		visibiltiy: {},
		insurerId: string,
		isActive: true
	}


	ngOnInit() {
		this.steps = [
			{
				text: "Step 1",
				state: ["complete"],
			},
			{
				text: "Step 2",
				state: ["current"],
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
		this.current = 1;
		this.challange = {
			title: "",
			description: "",
			Objective: "",
			expiryDate: "",
			visulizationImageFilePath: [
				""
			],
			sampleDataFilePath: [
				""
			],
			submissionsCount: 0,
			acceptedUsersCount: 0,
			challengeType: "CONTRACT",
			phases: [{}],
			visibiltiy: {},
			insurerId: this.insurerId,
			isActive: true
		}
	}

	stepSelected() { }

	nextStep() {
		this.current = 2
	}

	nextStepOne(stepOneData) {
		console.log("stepOne ... ", stepOneData);

		this.challange.title = stepOneData.title;
		this.challange.description = stepOneData.description;
		this.challange.Objective = stepOneData.objective;
		this.challange.expiryDate = new Date(stepOneData.endDate).toDateString();

		this.current++;
	}

	previousStepTwo() {

		this.current--;
	}

	nextStepTwo(stepTwoData) {
		let phase = {
			description: stepTwoData.description,
			usageGuidance: stepTwoData.guidence,
			minimumModelScore: stepTwoData.score,
		};
		this.challange.phases = [phase];
		this.current++
	}

	previousStepThree() {
		this.current--
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
		this.current--
	}

	nextStepFour() {
		console.log("challangeData .. ", this.challange)
		this.requestService.post('challenge', this.challange).subscribe(res => {
			console.log(res)
		})
		this.current++;
	}



}
