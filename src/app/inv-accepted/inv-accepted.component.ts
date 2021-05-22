import { Component, OnInit, } from "@angular/core";
import { RequestService } from "../request.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
	selector: 'app-inv-accepted',
	templateUrl: './inv-accepted.component.html',
	styleUrls: ['./inv-accepted.component.scss']
})

export class InvAcceptedComponent implements OnInit {

	constructor(private requestService: RequestService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private location: Location) { }

	pageNo: number;
	toasterMsg: boolean;
	challengeId: any;
	leaderboard: any[];
	isChallengeAccepted: boolean;
	phasesSubmissionComplete: boolean;
	acceptedChallenge: any;
	challengeDetails: any;
	current: number;
	steps: any[];
	insurerId: string;
	awardedTo: string;
	submissionData: {
		challengeId: {},
		phaseId: any,
		mlFlowId: string,
		modelName: String,
		appliedAsCompany: true,
		modelDescription: string,
		modelUploadedPath: string,
		modelType: string,
		approch: string,
		language: string,
		score: 0,
		precisionScore: 0,
		recallScore: 0,
		contractAcceptedAt: string,
		trainedAt: string,
		testedAt: string
	}
	challengeSubmissionData: any;
	pageOffset: number;
	totalPage: number;


	ngOnInit() {
		this.pageOffset = 0;
		this.totalPage = 0;
		this.pageNo = 0;
		this.isChallengeAccepted = false;
		this.phasesSubmissionComplete = false;
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.challengeId = params.id
			}
		});

		this.getChallengeDetails(this.challengeId);
		this.getSubmissionByChallengeId(this.challengeId);
		this.getChallengeAcceptance(this.challengeId);
		this.getLeaderboard(this.challengeId, this.pageOffset);

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
			}			
		];
		this.current = 3;
		this.submissionData = {
			challengeId: {},
			phaseId: [],
			mlFlowId: "",
			modelName: '',
			appliedAsCompany: true,
			modelDescription: "",
			modelUploadedPath: "",
			modelType: "",
			approch: "",
			language: '',
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
		this.requestService.get(url, null).subscribe(data => {
			this.challengeDetails = data;
		})
	}

	getChallengeAcceptance(challengeId) {
		let url = 'userChallenge/accepted/' + challengeId;
		this.requestService.get(url, null).subscribe(data => {
			this.acceptedChallenge = data;
			if (data._id.length > 0) {
				this.isChallengeAccepted = true;
			}
		})
	}

	getLeaderboard(challengeId, pageOffset) {
		let url = 'leaderboard/' + challengeId;
		let params = {
			skip: pageOffset
		}
		this.requestService.get(url, params).subscribe(data => {
			this.totalPage = Math.ceil(data.count/10);
			this.leaderboard = data.list;
		})
	}

	getSubmissionByChallengeId(challengeId) {
		let url = 'submissionAllChallenge/challenge-innovator/' + challengeId;
		this.requestService.get(url, null).subscribe(data => {
			this.challengeSubmissionData = data
			if (this.challengeSubmissionData.length == this.challengeDetails.phases.length) {
				this.phasesSubmissionComplete = true
			}
		})
	}

	getScore() {
		return Math.floor(Math.random() * (100 - 0 + 1) + 0)
	}

	getDate(timeStamp) {
		let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
		return date;
	}

	acceptChallenge(challengeId) {
		let data = {
			challengesIds: [challengeId]
		}
		let url = 'userChallenge';
		this.requestService.post(url, data).subscribe(data => {
			this.getChallengeAcceptance(challengeId)
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

	navigateBack() {
		this.location.back()
	}

	prevPage() {
		if (this.pageNo > 1) {
			this.pageNo--;
			this.pageOffset = this.pageNo*10;
			this.getLeaderboard(this.challengeDetails._id, this.pageOffset)
		}
	}

	nextPage() {
		if (this.pageNo < (this.totalPage-1)) {
			this.pageNo++;
			this.pageOffset = this.pageNo*10;
			this.getLeaderboard(this.challengeDetails._id, this.pageOffset)
		}
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

			  let downloadUrl = 'challenge/downloadsCount/' + this.challengeDetails._id;
          this.requestService.put(downloadUrl, null).subscribe(data => {
            // this.getDownloadsCount();
          })
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

	getPhaseId() {
		if (this.challengeSubmissionData.length>0) {			
			let ind = this.challengeSubmissionData.length
			let phaseId = this.challengeDetails.phases[ind].phaseId
			return phaseId;
		} else {
			return this.challengeDetails.phases[0].phaseId
		}
	}

	nextStepOne(stepOne) {
		this.submissionData.challengeId = this.challengeId
		this.submissionData.phaseId = this.getPhaseId()
		this.submissionData.modelType = 'MODIFIED_TRAINED_MODEL'
		this.submissionData.modelUploadedPath = stepOne.modelUploadedPath,

		this.current++;
	}

	previousStepTwo() {
		this.current--;
	}

	nextStepTwo(stepTwoData) {
		this.submissionData.modelName = stepTwoData.modelName
		this.submissionData.modelDescription = stepTwoData.description;
		this.submissionData.approch = stepTwoData.approach
		this.submissionData.language = stepTwoData.language				// language attribute not present

		this.current++
	}

	previousStepThree() {
		this.current--
	}

	nextStepThree() {
		let url = 'submissionAllChallenge';
		this.requestService.post(url, this.submissionData).subscribe( data => {
			this.getSubmissionByChallengeId(this.challengeId);
			// this.getChallengeDetails(this.challengeId)
			this.getLeaderboard(this.challengeId, this.pageOffset)
			this.current++;
		})
	}

	goToStepOne() {
		this.current = 0
	}

	invChallenges() {
		this.router.navigateByUrl('invchallenges')
	}

}
