import { Component, OnInit } from '@angular/core';
import { RequestService } from "../request.service";
import { Router } from "@angular/router";


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

	ngOnInit() {
		this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
		if (this.userDetails && this.userDetails._id) {			
			this.getAllActiveChallanges();
			this.getAllPastChallanges();
			this.getChallengeSubmissionRanking();
			this.getSubmittedChallenge();

			this.sorting = [
				{ content: 'Most Popular' },
				{ content: 'Least Popular' },
				{ content: 'Newest' },
				{ content: 'Oldest' },
				{ content: 'End Date' }
			];
		} else {
			this.router.navigateByUrl('login')
		}
	}

	getChallengeSubmissionRanking() {
		let url = "submissionAllChallenge/submissions/rank";
		this.requestService.get(url, null).toPromise().then(data => {
			this.submissionRanking = data
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	getSubmittedChallenge() {
		let url = 'submissionAllChallenge'
		this.requestService.get(url, null).toPromise().then(data => {
		  this.submittedChallenges = data
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
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
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	getAllActiveChallanges() {
		let allActiveChallanegUrl = "challenge/all";
		let params = {
			skip: 0,
			offset: 0
		}

		this.requestService.get(allActiveChallanegUrl, params).toPromise().then(data => {
			this.activeChallenges = data.list;
			this.getBookmarkedChallenges();
			this.getSubmission();
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
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
			this.submittedActiveChallenges = tempData
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	getAllPastChallanges() {
		let url = "challenge/allPast";
		let params = {
			skip: 0,
			offset: 0
		}

		this.requestService.get(url, params).toPromise().then(data => {
			this.pastChallenges = data.list;
			//   this.getBookmarkedChallenges();
			this.getSubmissionPast();
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	getSubmissionPast() {
		let url = "submissionAllChallenge";
		this.requestService.get(url, null).toPromise().then(data => {
			let tempData = []
			this.pastChallenges.filter(dt => {
				data.map(res => {
					if (dt._id == res.challengeId && dt.isActive == false) {
						tempData.push(dt)
					}
				})
			})
			this.submittedPastChallenges = tempData
		}).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
	}

	sortSelect(sort) {
		let criteria = sort.item.content;
		if (criteria == 'Newest') {
			this.activeChallenges.sort((a, b) => {
				return b.createdAt - a.createdAt
			})
			this.pastChallenges.sort((a, b) => {
				return b.createdAt - a.createdAt
			})
			this.bookmarkedChallenges.sort((a, b) => {
				return b.createdAt - a.createdAt
			})
		}
		if (criteria == 'Oldest') {
			this.activeChallenges.sort((a, b) => {
				return a.createdAt - b.createdAt
			})
			this.pastChallenges.sort((a, b) => {
				return a.createdAt - b.createdAt
			})
			this.bookmarkedChallenges.sort((a, b) => {
				return a.createdAt - b.createdAt
			})
		}
		if (criteria == 'End Date') {
			this.activeChallenges.sort((a, b) => {
				return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
			})
			this.pastChallenges.sort((a, b) => {
				return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
			})
			this.bookmarkedChallenges.sort((a, b) => {
				return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
			})
		}
		if (criteria == 'Most Popular') {
			this.activeChallenges.sort((a, b) => {
				return b.acceptedUsersCount - a.acceptedUsersCount
			})
			this.pastChallenges.sort((a, b) => {
				return b.acceptedUsersCount - a.acceptedUsersCount
			})
			this.bookmarkedChallenges.sort((a, b) => {
				return b.acceptedUsersCount - a.acceptedUsersCount
			})
		}
		if (criteria == 'Least Popular') {
			this.activeChallenges.sort((a, b) => {
				return a.acceptedUsersCount - b.acceptedUsersCount
			})
			this.pastChallenges.sort((a, b) => {
				return a.acceptedUsersCount - b.acceptedUsersCount
			})
			this.bookmarkedChallenges.sort((a, b) => {
				return a.acceptedUsersCount - b.acceptedUsersCount
			})
		}
	}

}