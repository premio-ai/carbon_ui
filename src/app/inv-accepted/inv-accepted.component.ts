import { Component, OnInit, } from "@angular/core";
import { RequestService } from "../request.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { APP_URL, MESSAGES, ROLE } from '../../config/config';

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
	withdrawToasterMsg: boolean;
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
	appUrl: String;
	imageUrlArr: any[] = [];
	submissionCount: number;
	enterPhaseId: string;
	errorToasterMsg: boolean;
	userSessionExpired: boolean;
	isApiLoading: boolean;
	routeAuthError: boolean;

	ngOnInit() {
		let userDetails = JSON.parse(localStorage.getItem('userDetails'))
		if (userDetails && userDetails._id) {
			if (userDetails.role == ROLE.INNOVATOR) {
				this.isApiLoading = false;
				this.appUrl = APP_URL;
				this.enterPhaseId = '';
				this.pageOffset = 0;
				this.totalPage = 1;
				this.pageNo = 1;
				this.isChallengeAccepted = false;
				this.phasesSubmissionComplete = false;
				this.submissionCount = 0;
				this.userSessionExpired = false;
				this.activatedRoute.params.subscribe((params: Params) => {
					if (params) {
						this.challengeId = params.id
					}
				});

				this.getChallengeDetails(this.challengeId);
				this.getChallengeAcceptance(this.challengeId);
				this.getLeaderboard(this.challengeId, this.pageOffset);

				this.steps = [
					{
						text: "Step 1 ",
						state: ["incomplete"],
						optionalText: 'Upload'
					},
					{
						text: "Step 2",
						state: ["incomplete"],
						optionalText: 'Details'
					},
					{
						text: "Step 3",
						state: ["incomplete"],
						optionalText: 'Confirm'
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
				};

				setTimeout(() => {
					(<any>window).disqus_config = this.getConfig();

					var d = document, s: any = d.createElement('script');
					s.src = 'https://meanapp.disqus.com/embed.js';
					s.setAttribute('data-timestamp', + new Date());
					(d.head || d.body).appendChild(s);
				}, 1000)
			} else {
				this.routeAuthError = true;
			}
		} else {
			this.router.navigateByUrl('')
		}

	}

	getConfig() {
		let _self = this;
		return function () {
			this.page.url = APP_URL + 'challenge/' + _self.challengeId;
			this.page.identifier = _self.challengeId;
			this.language = 'en';
		};
	}

	getChallengeDetails(id) {
		let url = 'challenge/' + id;
		this.requestService.get(url, null).toPromise().then(data => {
			this.challengeDetails = data;
			this.getSubmissionByChallengeId(this.challengeId);
			this.displayImage()
		}).catch(err => {
			if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
				this.userSessionExpired = true
				setTimeout(() => {
					this.reLogin();
				}, 3000)
			}
		})
	}

	getChallengeAcceptance(challengeId) {
		let url = 'userChallenge/accepted/' + challengeId;
		this.requestService.get(url, null).toPromise().then(data => {
			this.acceptedChallenge = data;
			if (data._id.length > 0) {
				this.isChallengeAccepted = true;
			} else {
				this.isChallengeAccepted = false;
			}
		}).catch(err => {
			if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
				this.userSessionExpired = true
				setTimeout(() => {
					this.reLogin();
				}, 3000)
			}
		})
	}

	getLeaderboard(challengeId, pageOffset) {
		let url = 'leaderboard/' + challengeId;
		let params = {
			skip: pageOffset
		}
		this.requestService.get(url, params).toPromise().then(data => {
			this.totalPage = Math.ceil(data.count / 10);
			this.leaderboard = data.list;
		}).catch(err => {
			if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
				this.userSessionExpired = true
				setTimeout(() => {
					this.reLogin();
				}, 3000)
			}
		})
	}

	getSubmissionByChallengeId(challengeId) {
		let url = 'submissionAllChallenge/allSubmitOfChallenge/' + challengeId;
		this.requestService.get(url, null).toPromise().then(data => {
			let tempData = []
			data.map(dt => {
				tempData.push(dt.modelData)
			})
			this.challengeSubmissionData = data
			if (this.challengeSubmissionData.length == this.challengeDetails.phases.length) {
				this.phasesSubmissionComplete = true
			}
		}).catch(err => {
			this.errorToaster();
			if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
				this.userSessionExpired = true
				setTimeout(() => {
					this.reLogin();
				}, 3000)
			}
		})
	}

	errorToaster = (() => {
		this.errorToasterMsg = true
		setTimeout(() => {
			this.errorToasterMsg = false
		}, 3000)
	})

	enterPhase(phaseId) {
		this.current = 0
		this.enterPhaseId = phaseId
	}

	// download config.ini file
	async downloadConfigFile() {
		let url = APP_URL + '/api/files/config.ini'
		fetch(url)
			.then(response => response.blob())
			.then(blob => URL.createObjectURL(blob))
			.then(uril => {
				var link = document.createElement("a");
				link.href = uril;
				link.download = 'config.ini';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			});
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
		this.requestService.post(url, data).toPromise().then(data => {
			this.getChallengeAcceptance(challengeId)
			this.showToaster()
		}).catch(err => {
			this.errorToaster();
			if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
				this.userSessionExpired = true
				setTimeout(() => {
					this.reLogin();
				}, 3000)
			}
		})
	}

	withdrawChallenge(challengeId) {
		let data = {
			challengesIds: [challengeId]
		}
		let url = 'userChallenge';
		this.requestService.put(url, data).toPromise().then(data => {
			this.getChallengeAcceptance(challengeId)
			this.showWithdrawToaster()
		}).catch(err => {
			this.errorToaster();
			if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
				this.userSessionExpired = true
				setTimeout(() => {
					this.reLogin();
				}, 3000)
			}
		})
	}

	showToaster = (() => {
		this.toasterMsg = true
		setTimeout(() => {
			this.toasterMsg = false
		}, 3000)
	})

	showWithdrawToaster = (() => {
		this.withdrawToasterMsg = true
		setTimeout(() => {
			this.withdrawToasterMsg = false
		}, 3000)
	})

	closeToaster() {
		this.toasterMsg = false;
		this.withdrawToasterMsg = false;
		this.errorToasterMsg = false;
	}

	navigateBack() {
		this.location.back()
	}

	prevPage() {
		if (this.pageNo > 1) {
			this.pageNo--;
			this.pageOffset = (this.pageNo - 1) * 10;
			this.getLeaderboard(this.challengeDetails._id, this.pageOffset)
		}
	}

	nextPage() {
		if (this.pageNo < (this.totalPage)) {
			this.pageNo++;
			this.pageOffset = (this.pageNo - 1) * 10;
			this.getLeaderboard(this.challengeDetails._id, this.pageOffset)
		}
	}

	async displayImage() {
		this.challengeDetails.phases.map(dt => {
			let payload = {
				filePath: dt.dataVisualFile
			}
			this.requestService.post('upload/getImage', payload).toPromise().then(data => {
				var a = document.createElement("a");
				document.body.appendChild(a);
				this.imageUrlArr.push(data.blob)
			}).catch(err => {
				if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
					this.userSessionExpired = true
					setTimeout(() => {
						this.reLogin();
					}, 3000)
				}
			})
		})
	}

	async downloadFile(phaseIndex) {
		if (this.challengeDetails) {
			let newDocName = ''
			let fileIndex: number;
			this.challengeDetails.phases[phaseIndex].sampleDataFile.find((dt, i) => {
				if (dt.path.endsWith('train.csv')) {
					newDocName = dt.path
					fileIndex = i
				}
			})

			let payload = {
				filePath: newDocName
			}
			this.requestService.post('upload/downloadObject', payload).toPromise().then(data => {
				var blob = this.dataURItoBlob(data.blob)
				var a = document.createElement("a");
				document.body.appendChild(a);
				var url = window.URL.createObjectURL(blob);

				a.href = url;
				a.download = "train.csv";
				a.click();
				window.URL.revokeObjectURL(url);
			}).catch(err => {
				if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
					this.userSessionExpired = true
					setTimeout(() => {
						this.reLogin();
					}, 3000)
				}
				this.errorToaster();
			})

			let downloadUrl = 'challenge/fileDownloadsCount/' + this.challengeDetails._id;
			let payloadData = {
				challengeId: this.challengeDetails._id,
				phaseId: this.challengeDetails.phases[phaseIndex].phaseId,
				fileId: this.challengeDetails.phases[phaseIndex].sampleDataFile[fileIndex]
			}
			this.requestService.put(downloadUrl, payloadData).subscribe(data => { })
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

	stepSelected() { }

	nextStep() {
		this.current = 1
	}

	getPhaseId() {
		if (this.challengeSubmissionData.length > 0) {
			let ind = this.challengeSubmissionData.length
			let phaseId = this.challengeDetails.phases[ind].phaseId
			return phaseId;
		} else {
			return this.challengeDetails.phases[0].phaseId
		}
	}

	nextStepOne(stepOne) {
		this.submissionData.challengeId = this.challengeId;
		this.submissionData.phaseId = stepOne.phaseId
		this.submissionData.modelType = 'MODIFIED_TRAINED_MODEL';
		this.submissionData.modelUploadedPath = stepOne.modelUploadedPath;

		this.getSubmissionCount(stepOne.phaseId)

		this.current++;
	}

	getSubmissionCount(phaseId) {
		let count = 0
		this.challengeSubmissionData.map(dt => {
			if (dt.phaseId == phaseId) {
				count += 1
			}
		})
		this.submissionCount = count + 1
	}

	cancelSubmit() {
		this.current = 3
	}

	previousStepTwo() {
		this.current--;
	}

	nextStepTwo(stepTwoData) {
		this.submissionData.modelName = stepTwoData.modelName
		this.submissionData.modelDescription = stepTwoData.description;
		this.submissionData.approch = stepTwoData.approach
		this.submissionData.language = stepTwoData.language

		this.current++
	}

	previousStepThree() {
		this.current--
	}

	nextStepThree() {
		this.isApiLoading = true;
		let url = 'submissionAllChallenge';
		let payload = {
			submissionCount: this.submissionCount,
			data: this.submissionData
		}
		this.requestService.post(url, payload).toPromise().then(data => {
			this.isApiLoading = false;
			this.getSubmissionByChallengeId(this.challengeId);
			this.getLeaderboard(this.challengeId, this.pageOffset)
			this.current++;
		}).catch(err => {
			this.isApiLoading = false;
			this.errorToaster();
			if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
				this.userSessionExpired = true
				setTimeout(() => {
					this.reLogin();
				}, 3000)
			}
		})
	}

	goToStepOne() {
		this.current = 0
	}

	invChallenges() {
		this.router.navigateByUrl('invchallenges')
	}

	viewChallenge(challengeId) {
		this.router.navigateByUrl('invaccepted/' + challengeId)
	}

	reLogin() {
		let id = JSON.parse(localStorage.getItem('timeoutId'))
		clearTimeout(id);
		localStorage.clear();
		this.router.navigateByUrl('login')
	}

}
