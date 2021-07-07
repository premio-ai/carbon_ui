import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Location } from '@angular/common';
import * as moment from 'moment';
import "@carbon/charts/styles.css";

@Component({
	selector: 'app-model-report',
	templateUrl: './model-report.component.html',
	styleUrls: ['./model-report.component.scss']
})

export class ModelReportComponent implements OnInit {

	constructor(
		private requestService: RequestService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private location: Location
	) { }
	toasterMsg: boolean;
	modelId: any;
	challengeCounts: any;
	modelReport: any;
	challengeDetails: any;
	challengeSubmission: any;
	overallScore: any;
	accuracyScore: any;
	precisionScore: any;
	recallScore: any;
	overallScoreData: Array<{
		group: string,
		value: number
	}> = []
	overallOptions: any = {}
	accuracyScoreData: Array<{
		group: string,
		value: number
	}> = []
	accuracyOptions: any = {}
	precisionScoreData: Array<{
		group: string,
		value: number
	}> = []
	precisionOptions: any = {}
	recallScoreData: Array<{
		group: string,
		value: number
	}> = []
	recallOptions: any = {}

	ngOnInit() {
		let userDetails = JSON.parse(localStorage.getItem('userDetails'))
		if (userDetails && userDetails._id) {
			this.toasterMsg = false
			this.activatedRoute.params.subscribe((params: Params) => {
				if (params) {
					this.modelId = params.id
					this.getModelReport(this.modelId);
				}
			});
		} else {
			this.router.navigateByUrl('')
		}
	}

	bell = (() => {
		this.toasterMsg = true
		setTimeout(() => {
			this.toasterMsg = false
		}, 3000)
	})

	getModelReport(modelId) {
		let url = 'submissionAllChallenge/modelReport/' + modelId;
		this.requestService.get(url, null).toPromise().then(data => {
			this.modelReport = data[0];

			this.getChallengeDetails(this.modelReport.challengeId)
			this.getInnovatorChallengeCounts();

			this.accuracyScore = this.modelReport.score
			this.precisionScore = this.modelReport.precisionScore
			this.recallScore = this.modelReport.recallScore
			this.overallScore = Math.ceil((this.accuracyScore + this.precisionScore + this.recallScore) / 3)

			this.overall()
			this.accuracy();
			this.precision();
			this.recall();
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	switchSubmit(submitId) {
		this.router.navigateByUrl('modelReport/' + submitId)
	}

	getPhaseIndex() {
		if (this.modelReport && this.challengeDetails) {
			let phaseId = this.modelReport.phaseId;
	
			let index = this.challengeDetails.phases.findIndex( dt => {
				if (dt.phaseId == phaseId) {
					return true
				}
			})
	
			return index;
		}
	}

	checkSelected(phaseId) {
		this.challengeSubmission.some(dt => {
			if (dt.phaseId == phaseId) {
				return true
			}
		})
	}

	getChallengeDetails(challengeId) {
		let url = "challenge/" + challengeId;

		this.requestService.get(url, null).toPromise().then(data => {
			this.challengeDetails = data
			this.getChallengeSubmission(this.challengeDetails._id)
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	getChallengeSubmission(challengeId) {
		let innovatorId = this.modelReport.innovatorId._id
		let url = "submissionAllChallenge/challenge-innovator/" + challengeId + '/' + innovatorId;

		this.requestService.get(url, null).toPromise().then(data => {
			this.challengeSubmission = data
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	getInnovatorChallengeCounts() {
		let innovatorId = this.modelReport.innovatorId._id
		this.requestService.get('submissionAllChallenge/innovatorCounts/' + innovatorId, null).toPromise().then(data => {
			this.challengeCounts = data
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	getDate(timeStamp) {
		let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
		return date;
	}

	navigateBack() {
		this.location.back()
	}

	overall() {
		this.overallScoreData = [
			{
				group: 'Overall',
				value: this.overallScore
			},
			{
				group: '',
				value: 100 - this.overallScore
			}
		];
		this.overallOptionFxn();
	}

	overallOptionFxn() {
		this.overallOptions = {
			title: 'Overall Score',
			animations: true,
			donut: {
				center: {
					label: `${this.overallScoreData[0].value}` + '%'
				}
			},
			height: "350px",
			getFillColor: (group: string) => {
				if (group == 'Overall') {
					return 'blue'
				}
				if (group == '') {
					return 'white'
				}
			},
			legend: {
				alignment: 'center'
			}
		};
	}

	accuracy() {
		this.accuracyScoreData = [
			{
				group: 'Accuracy',
				value: this.accuracyScore
			},
			{
				group: '',
				value: 100 - this.accuracyScore
			}
		];
		this.accuracyOptionFxn();
	}

	accuracyOptionFxn() {
		this.accuracyOptions = {
			title: 'Accuracy Score',
			animations: true,
			donut: {
				center: {
					label: `${this.accuracyScoreData[0].value}` + '%'
				}
			},
			height: "350px",
			getFillColor: (group: string) => {
				if (group == 'Accuracy') {
					return 'blue'
				}
				if (group == '') {
					return 'white'
				}
			},
			legend: {
				alignment: 'center'
			}
		};
	}

	precision() {
		this.precisionScoreData = [
			{
				group: 'Precision',
				value: this.precisionScore
			},
			{
				group: '',
				value: 100 - this.precisionScore
			}
		];
		this.precisionOptionFxn();
	}

	precisionOptionFxn() {
		this.precisionOptions = {
			title: 'Precision Score',
			animations: true,
			donut: {
				center: {
					label: `${this.precisionScoreData[0].value}` + '%'
				}
			},
			height: "350px",
			getFillColor: (group: string) => {
				if (group == 'Precision') {
					return 'blue'
				}
				if (group == '') {
					return 'white'
				}
			},
			legend: {
				alignment: 'center'
			}
		};
	}

	recall() {
		this.recallScoreData = [
			{
				group: 'Recall',
				value: this.recallScore
			},
			{
				group: '',
				value: 100 - this.recallScore
			}
		];
		this.recallOptionFxn();
	}

	recallOptionFxn() {
		this.recallOptions = {
			title: 'Precision Score',
			animations: true,
			donut: {
				center: {
					label: `${this.recallScoreData[0].value}` + '%'
				}
			},
			height: "350px",
			getFillColor: (group: string) => {
				if (group == 'Recall') {
					return 'blue'
				}
				if (group == '') {
					return 'white'
				}
			},
			legend: {
				alignment: 'center'
			}
		};
	}

	data1 = [
		{
			"group": "Test Loss",
			"iterationValue": "175",
			"lossValue": 6,
			"surplus": 1002699017.8470289
		},
		{
			"group": "Test Loss",
			"iterationValue": "250",
			"lossValue": 5,
			"surplus": 621850522.7278733
		},
		{
			"group": "Test Loss",
			"iterationValue": "375",
			"lossValue": 4,
			"surplus": 15051.210563382705
		},
		{
			"group": "Test Loss",
			"iterationValue": "600",
			"lossValue": 3,
			"surplus": 264023275.2154339
		},
		{
			"group": "Test Loss",
			"iterationValue": "825",
			"lossValue": 2,
			"surplus": 773041874.3261496
		},
		{
			"group": "Train Loss",
			"iterationValue": "250",
			"lossValue": 2,
			"surplus": 1823.656992324374
		},
		{
			"group": "Train Loss",
			"iterationValue": "380",
			"lossValue": 3,
			"surplus": 600510781.1304932
		},
		{
			"group": "Train Loss",
			"iterationValue": "550",
			"lossValue": 4,
			"surplus": 540820524.4244617
		},
		{
			"group": "Train Loss",
			"iterationValue": "590",
			"lossValue": 5.5,
			"surplus": 815336175.5584991
		},
		{
			"group": "Train Loss",
			"iterationValue": "640",
			"lossValue": 5,
			"surplus": 430635742.9919021
		},
		{
			"group": "Test accuracy",
			"iterationValue": "600",
			"lossValue": 2,
			"surplus": 313175906.22738886
		},
		{
			"group": "Test accuracy",
			"iterationValue": "700",
			"lossValue": 3,
			"surplus": 19827.345993116214
		},
		{
			"group": "Test accuracy",
			"iterationValue": "800",
			"lossValue": 4,
			"surplus": 277258874.3732382
		},
		{
			"group": "Test accuracy",
			"iterationValue": "900",
			"lossValue": 5,
			"surplus": 683773276.4278555
		},
		{
			"group": "Test accuracy",
			"iterationValue": "1000",
			"lossValue": 6,
			"surplus": 66567804.487799056
		}
	];
	options1 = {
		"title": "Loss vs Iteration",
		"color": {
			"pairing": {
				"option": 2
			},
			"scale": {
				"Qty": "#925699",
				"Misc": "#525669"
			}
		},
		grid: { x: { enabled: false } },
		"axes": {
			"bottom": {
				"title": "Iteration",
				"mapsTo": "iterationValue",
				"scaleType": "linear"
			},
			"left": {
				"title": "Loss",
				"mapsTo": "lossValue",
				"scaleType": "linear"
			}
		},
		"curve": "curveMonotoneX",
		"height": "400px",

		getFillColor: (group: String) => {
			if (group == 'Test Loss') {
				return '#F3A625';
			}
			if (group == 'Train Loss') {
				return 'green';
			}
			if (group == 'Test Accuracy') {
				return 'white';
			}

		},
		getStrokeColor: (group: String) => {
			if (group == 'Test Loss') {
				return '#F3A625';
			}
			if (group == 'Train Loss') {
				return 'green';
			}
			if (group == 'Test Accuracy') {
				return 'white';
			}

		}
	};

	viewChallenge(challengeId) {
		this.router.navigateByUrl('challenge/' + challengeId)
	}

}
