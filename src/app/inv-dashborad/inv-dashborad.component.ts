import { Component, OnInit } from '@angular/core';
import { RequestService } from "../request.service";
import { Router } from "@angular/router";
import { uniqBy } from 'lodash';



@Component({
	selector: 'app-inv-dashborad',
	templateUrl: './inv-dashborad.component.html',
	styleUrls: ['./inv-dashborad.component.scss']
})
export class InvDashboradComponent implements OnInit {

	constructor(
		private requestService: RequestService,
		private router: Router
	) { }
	userDetails: any;
	activeChallenges: any[];
	pastChallenges: any[];
	bookmarkedChallenges: any[];
	submittedActiveChallenges: any[] = [];
	submittedPastChallenges: any[] = [];
	submissionRanking: any[] = [];
	sorting: any[];
	submittedChallenges: any[] = [];
	submissionPerformance: any[] = []

	ngOnInit() {
		this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
		if (this.userDetails && this.userDetails._id) {			
			this.getAllActiveChallanges();
			this.getAllPastChallanges();
			this.getChallengeSubmissionRanking();
			this.getSubmittedChallenge();
			this.getModelPerformance();

			this.sorting = [
				{ content: 'Most Popular' },
				{ content: 'Least Popular' },
				{ content: 'Newest' },
				{ content: 'Oldest' },
				{ content: 'End Date' }
			];
		} else {
			this.router.navigateByUrl('')
		}
	}

	getChallengeSubmissionRanking() {
		let url = "submissionAllChallenge/submissions/rank";
		this.requestService.get(url, null).toPromise().then(data => {
			this.submissionRanking = data
		}).catch(err => { })
	}

	getModelPerformance() {
		let url = "submissionAllChallenge/submissions/modelPerformance"

		this.requestService.get(url, null).toPromise().then( data => {
			this.submissionPerformance = data
		}).catch( err => { })

	}

	getSubmittedChallenge() {
		let url = 'submissionAllChallenge'
		this.requestService.get(url, null).toPromise().then(data => {
		  this.submittedChallenges = data
		}).catch(err => { })
	  }

	getBookmarkedChallenges() {
		let url = "bookmarkChallenge";
		this.requestService.get(url, null).toPromise().then(data => {
			let tempData = []
			this.activeChallenges.filter(dt => {
				data.map(res => {
					if (dt._id == res.challengeId) {
						tempData.push(dt)
					}
				})
			})
			this.bookmarkedChallenges = tempData;
		}).catch(err => { })
	}

	getAllActiveChallanges() {
		let allActiveChallanegUrl = "challenge/inv-dashboard";
		let params = {
			skip: 0,
			offset: 0
		}

		this.requestService.get(allActiveChallanegUrl, params).toPromise().then(data => {
			this.activeChallenges = data.list;
			this.getBookmarkedChallenges();
			this.getSubmission();
		}).catch(err => { })
	}

	getSubmission() {
		let url = "submissionAllChallenge";
		this.requestService.get(url, null).toPromise().then(data => {
			let tempData = []
			this.activeChallenges.filter(dt => {
				data.map(res => {
					if (dt._id == res.challengeId) {
						tempData.push(dt)
					}
				})
			})
			this.submittedActiveChallenges = uniqBy(tempData)
		}).catch(err => { })
	}

	getAllPastChallanges() {
		let url = "challenge/allPast";
		let params = {
			skip: 0,
			offset: 0
		}

		this.requestService.get(url, params).toPromise().then(data => {
			this.pastChallenges = data.list;
			this.getSubmissionPast();
		}).catch(err => { })
	}

	getSubmissionPast() {
		let url = "submissionAllChallenge";
		this.requestService.get(url, null).toPromise().then(data => {
			let tempData = [];
			this.pastChallenges.filter(dt => {
				data.map(res => {
					if (dt._id == res.challengeId) {
						tempData.push(dt)
					}
				})
			})
			this.submittedPastChallenges = uniqBy(tempData)
		}).catch(err => { })
	}

	sortSelect(sort) {
		let criteria = sort.item.content;
		if (criteria == 'Newest') {
			this.submittedActiveChallenges.sort((a, b) => {
				return b.createdAt - a.createdAt
			})
			this.submittedPastChallenges.sort((a, b) => {
				return b.createdAt - a.createdAt
			})
			this.bookmarkedChallenges.sort((a, b) => {
				return b.createdAt - a.createdAt
			})
		}
		if (criteria == 'Oldest') {
			this.submittedActiveChallenges.sort((a, b) => {
				return a.createdAt - b.createdAt
			})
			this.submittedPastChallenges.sort((a, b) => {
				return a.createdAt - b.createdAt
			})
			this.bookmarkedChallenges.sort((a, b) => {
				return a.createdAt - b.createdAt
			})
		}
		if (criteria == 'End Date') {
			this.submittedActiveChallenges.sort((a, b) => {
				return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
			})
			this.submittedPastChallenges.sort((a, b) => {
				return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
			})
			this.bookmarkedChallenges.sort((a, b) => {
				return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
			})
		}
		if (criteria == 'Most Popular') {
			this.submittedActiveChallenges.sort((a, b) => {
				return b.acceptedUsersCount - a.acceptedUsersCount
			})
			this.submittedPastChallenges.sort((a, b) => {
				return b.acceptedUsersCount - a.acceptedUsersCount
			})
			this.bookmarkedChallenges.sort((a, b) => {
				return b.acceptedUsersCount - a.acceptedUsersCount
			})
		}
		if (criteria == 'Least Popular') {
			this.submittedActiveChallenges.sort((a, b) => {
				return a.acceptedUsersCount - b.acceptedUsersCount
			})
			this.submittedPastChallenges.sort((a, b) => {
				return a.acceptedUsersCount - b.acceptedUsersCount
			})
			this.bookmarkedChallenges.sort((a, b) => {
				return a.acceptedUsersCount - b.acceptedUsersCount
			})
		}
	}

}