import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from '../request.service';
import "@carbon/charts/styles.css";

@Component({
	selector: 'app-inv-see-performance',
	templateUrl: './inv-see-performance.component.html',
	styleUrls: ['./inv-see-performance.component.scss']
})

export class InvSeePerformanceComponent implements OnInit {

	constructor(
		private router: Router,
		private requestService: RequestService,
		private activatedRoute: ActivatedRoute
	) { }
	modelDetails: any;
	challengeId: any;
	innovatorId: any;
	phaseId: any;
	challengeDetails: any;
	accuracyScore: any
	precisionScore: any
	recallScore: any
	accuracyScoreData: Array<{
		group: string,
		value: number }> = []
	accuracyOptions: any = {}
	precisionScoreData: Array<{
		group: string,
		value: number }> = []
	precisionOptions: any = {}
	recallScoreData: Array<{
		group: string,
		value: number }> = []
	recallOptions: any = {}

	ngOnInit() {
		let modelId = ''
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				modelId = params.id
			}
		});

		this.getSubmission(modelId)
	}

	getSubmission(id) {
		let url = 'submissionAllChallenge/' + id;
		this.requestService.get(url).subscribe(data => {
			this.modelDetails = data[0];
			this.challengeId = data[0].challengeId;
			this.phaseId = data[0].phaseId;
			this.innovatorId = data[0].innovatorId._id;
			this.accuracyScore = this.modelDetails.score
			this.precisionScore = this.modelDetails.precisionScore
			this.recallScore = this.modelDetails.recallScore

			this.getChallengeDetails(this.challengeId);
			this.accuracy();
			this.precision();
			this.recall();
		})
	}

	getChallengeDetails(id) {
		let url = 'challenge/' + id;
		this.requestService.get(url).subscribe(data => {
			this.challengeDetails = data;
		})
	}

	async downloadFile() {
		if (this.challengeDetails) {
			let docName = this.challengeDetails.phases[0].sampleDataFile[0] || ''
			let docUrl = 'http://localhost:3000/' + docName

			if (docUrl.length) {
				let imgUrl = 'http://localhost:3000/bc8af0906fb566c23cac8ebfe6480d5c.png'
				let pdfUrl = 'http://localhost:3000/eb99fd7d5386810a6b33363e9da82d73d.pdf'

				await fetch(docUrl).then(async res => {
					return await res.blob()
				}).then(blob => {
					var a = document.createElement("a");
					document.body.appendChild(a);
					const url = URL.createObjectURL(blob);

					a.href = url;
					a.download = "File";
					a.click();
					window.URL.revokeObjectURL(url);
				})
			} else {
				// this.docError = true
			}
		}
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
					return 'grey'
				}
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
					return 'grey'
				}
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
					return 'grey'
				}
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
				return 'blue';
			}
			if (group == 'Train Loss') {
				return 'yellow';
			}
			if (group == 'Test Accuracy') {
				return 'red';
			}
		},
		getStrokeColor: (group: String) => {
			if (group == 'Test Loss') {
				return 'blue';
			}
			if (group == 'Train Loss') {
				return 'yellow';
			}
			if (group == 'Test Accuracy') {
				return 'red';
			}
		}
	};

	viewModel() {
		this.router.navigateByUrl('invmodel-view/' + this.modelDetails._id)
	}

}
