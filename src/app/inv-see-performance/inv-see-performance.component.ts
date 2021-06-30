import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Location } from '@angular/common';
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
		private activatedRoute: ActivatedRoute,
		private location: Location
	) { }
	modelDetails: any;
	modelPerformance: any;
	challengeId: any;
	innovatorId: any;
	phaseId: any;
	challengeDetails: any;
	accuracyScore: any
	precisionScore: any
	recallScore: any
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
			let modelId = ''
			this.activatedRoute.params.subscribe((params: Params) => {
				if (params) {
					modelId = params.id
				}
			});
			this.getSubmission(modelId)
			this.getModelPerformance(modelId)
		} else {
			this.router.navigateByUrl('login')
		}
	}

	getSubmission(id) {
		let url = 'submissionAllChallenge/' + id;
		this.requestService.get(url, null).toPromise().then(data => {
			this.modelDetails = data[0];
			this.challengeId = data[0].challengeId;
			this.phaseId = data[0].phaseId;
			this.innovatorId = data[0].innovatorId._id;

			this.getChallengeDetails(this.challengeId);
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	getModelPerformance(id) {
		let url = 'submissionAllChallenge/modelPerformance/' + id;
		this.requestService.get(url, null).toPromise().then(data => {
			this.modelPerformance = data
			if (this.modelPerformance.length > 0) {
				this.modelPerformance.map(dt => {
					if (dt.key.startsWith('test_')) {
						if (dt.key == "test_accuracy") {
							this.accuracyScore = (dt.value * 100).toFixed(0)
						}
						if (dt.key == "test_macro_avg_precision") {
							this.precisionScore = (dt.value * 100).toFixed(0)
						}
						if (dt.key == "test_macro_avg_recall") {
							this.recallScore = (dt.value * 100).toFixed(0)
						}
						this.accuracy();
						this.precision();
						this.recall();
					} else if (dt.key.startsWith('training_')) {
						if (dt.key == "training_accuracy_score") {
							this.accuracyScore = (dt.value * 100).toFixed(0)
						}
						if (dt.key == "training_precision_score") {
							this.precisionScore = (dt.value * 100).toFixed(0)
						}
						if (dt.key == "training_recall_score") {
							this.recallScore = (dt.value * 100).toFixed(0)
						}
						this.accuracy();
						this.precision();
						this.recall();
					}
				})
			} else {
				this.accuracyScore = 0
				this.precisionScore = 0
				this.recallScore = 0
				this.accuracy();
				this.precision();
				this.recall();
			}
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	getChallengeDetails(id) {
		let url = 'challenge/' + id;
		this.requestService.get(url, null).toPromise().then(data => {
			this.challengeDetails = data;
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	checkDisplay() {
		let showMsg = false
		if (this.challengeDetails) {
			let passMark = 0
			this.challengeDetails.phases.map( res => {
				if (res.phaseId == this.phaseId) {
					passMark = res.passingScore
				}
			})
			if (this.accuracyScore >= passMark) {
				showMsg = true
			}
		}
		return showMsg;
	}

	navigateBack() {
		this.location.back();
	}

	async downloadFile(modelpath) {
		if (modelpath) {
			let payload = {
				filePath: modelpath
			}
			this.requestService.post('upload/downloadZip', payload).toPromise().then(data => {
				var fileName = "submission-model.zip";
				var blob = this.dataURItoBlob(data.blob)

				var a = document.createElement("a");
				document.body.appendChild(a);
				var url = window.URL.createObjectURL(blob);

				a.href = url;
				a.download = fileName;
				a.click();
				window.URL.revokeObjectURL(url);
				a.remove();
			}).catch(err => {
				localStorage.clear();
				this.router.navigateByUrl('login')
			})
		}
	}

	dataURItoBlob(dataURI) {
		var byteString = atob(dataURI.split(',')[1]);
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		var blob = new Blob([ab], { type: mimeString });
		return blob;
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
			height: "220px",
			getFillColor: (group: string) => {
				if (group == 'Accuracy') {
					return 'blue'
				}
				if (group == '') {
					return 'white'
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
			height: "220px",
			getFillColor: (group: string) => {
				if (group == 'Precision') {
					return 'blue'
				}
				if (group == '') {
					return 'white'
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
			height: "220px",
			getFillColor: (group: string) => {
				if (group == 'Recall') {
					return 'blue'
				}
				if (group == '') {
					return 'white'
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

	viewModel() {
		this.router.navigateByUrl('invmodel-view/' + this.modelDetails._id)
	}

	viewChallenge(id) {
		let url = 'challenge/' + id
		this.router.navigateByUrl(url);
	}

	browse() {
		this.router.navigateByUrl('invchallenges')
	}

	challengeTitle(challengeId) {
		this.router.navigateByUrl('invaccepted/' + challengeId)
	}

}
