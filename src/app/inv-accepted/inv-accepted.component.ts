import { Component, OnInit, } from "@angular/core";
import { RequestService } from "../request.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

@Component({
	selector: 'app-inv-accepted',
	templateUrl: './inv-accepted.component.html',
	styleUrls: ['./inv-accepted.component.scss']
})

export class InvAcceptedComponent implements OnInit {

	constructor(private requestService: RequestService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { }

	toasterMsg: boolean;
	challengeId: any;
	leaderboard: any[];
	acceptedChallenge: any;
	challengeDetails: any;
	current: number;
	steps: any[];
	insurerId = "6076c19aad0c92991a8ba0bf";
	awardedTo = "60767631222df1253206ff74";
	// innovatorId = "607e856d2d00fd7ed549689e";
	innovatorId = "607d651862c616905655e309";
	submissionData: {
		challengeId: {},
		phaseId: any,
		innovatorId: {},
		mlFlowId: string,
		appliedAsCompany: true,
		modelDescription: string,
		modelUploadedPath: string,
		modelType: string,
		approch: string,
		// language: string,
		score: 0,
		precisionScore: 0,
		recallScore: 0,
		contractAcceptedAt: string,
		trainedAt: string,
		testedAt: string
	}
	challengeSubmissionData: any


	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.challengeId = params.id
			}
		});

		this.getChallengeDetails(this.challengeId);
		this.getSubmissionByChallengeId(this.challengeId, this.innovatorId);
		this.getChallengeAcception(this.challengeId, this.innovatorId);
		// this.getChallengeAcception("607e856d2d00fd7ed549689d", this.innovatorId);
		this.getLeaderboard(this.challengeId);

		this.steps = [
			{
				text: "Step 1 ",
				state: ["incomplete"],
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
			
		];
		this.current = 0;
		this.submissionData = {
			challengeId: {},
			phaseId: [],
			innovatorId: {},
			mlFlowId: "",
			appliedAsCompany: true,
			modelDescription: "",
			modelUploadedPath: "",
			modelType: "",
			approch: "",
			// language: '',
			score: 0,
			precisionScore: 0,
			recallScore: 0,
			contractAcceptedAt: "",
			trainedAt: "",
			testedAt: ""
		}
	}

	getChallengeDetails(id) {
		let url = 'challenge/' + id;
		this.requestService.get(url).subscribe(data => {
			this.challengeDetails = data;
		})
	}

	getChallengeAcception(challengeId, innovatorId) {
		let url = 'userChallenge/accepted/' + challengeId + '/' + innovatorId;
		this.requestService.get(url).subscribe(data => {
			this.acceptedChallenge = data
		})
	}

	getLeaderboard(challengeId) {
		let url = 'leaderboard/' + challengeId;
		this.requestService.get(url).subscribe(data => {
			this.leaderboard = data
		})
	}

	getSubmissionByChallengeId(challengeId, innovatorId) {
		let url = 'submissionAllChallenge/challenge-innovator/' + challengeId + '/' + innovatorId;
		this.requestService.get(url).subscribe(data => {
			this.challengeSubmissionData = data
		})
	}

	getDate(timeStamp) {
		let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
		return date;
	}

	acceptChallenge(challengeId) {
		let data = {
			innovatorId: this.innovatorId,
			challengesIds: [challengeId]
		}
		let url = 'userChallenge';
		this.requestService.post(url, data).subscribe(data => {
			this.getChallengeAcception(challengeId, this.innovatorId)
			this.showToaster()
		})
	}

	showToaster = (() => {
		this.toasterMsg = true
		setTimeout(() => {
			this.toasterMsg = false
		}, 3000)
	})

	closeToaster() {
		this.toasterMsg = false
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

	stepSelected() { }

	nextStep() {
		this.current = 1
	}

	nextStepOne(stepOne) {
		this.submissionData.challengeId = this.challengeId
		this.submissionData.innovatorId = this.innovatorId
		this.submissionData.phaseId = this.challengeDetails.phases[0].phaseId
		this.submissionData.modelType = 'MODIFIED_TRAINED_MODEL'
		this.submissionData.modelUploadedPath = stepOne.modelUploadedPath

		this.current++;
	}

	previousStepTwo() {
		this.current--;
	}

	nextStepTwo(stepTwoData) {
		this.submissionData.modelDescription = stepTwoData.description;
		this.submissionData.approch = stepTwoData.approach
		// this.submissionData.language = stepTwoData.language				// language attribute not present

		this.current++
	}

	previousStepThree() {
		this.current--
	}

	nextStepThree() {
		let url = 'submissionAllChallenge';
		this.requestService.post(url, this.submissionData).subscribe( data => {
			this.getSubmissionByChallengeId(this.challengeId, this.innovatorId);
			// this.getChallengeDetails(this.challengeId)
			this.getLeaderboard(this.challengeId)
			this.current++;
		})
	}

}
