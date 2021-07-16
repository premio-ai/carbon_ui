import { Component, OnInit } from "@angular/core";
import { RequestService } from "../request.service";
import { Router } from "@angular/router";
import { MESSAGES, ROLE } from '../../config/config';

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	constructor(
		private requestService: RequestService,
		private router: Router
	) { }
	userDetails: any;
	activeChallenges: any[];
	pastChallenges: any[];
	sorting: any[];
	errorToasterMsg: boolean;
	userSessionExpired: boolean;
	routeAuthError: boolean;

	ngOnInit() {
		this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
		this.routeAuthError = false;
		if (this.userDetails && this.userDetails._id) {
			if (this.userDetails.role == ROLE.INSURER) {
				this.errorToasterMsg = false;
				this.userSessionExpired = false;
				this.getAllChallenges();
				// this.getActiveChallanges();
				// this.getpastChallanges();
			} else {
				this.routeAuthError = true
			}
		} else {
			this.router.navigateByUrl('')
		}

		this.sorting = [
			{ content: 'Most Popular' },
			{ content: 'Least Popular' },
			{ content: 'Newest' },
			{ content: 'Oldest' },
			{ content: 'End Date' },

		];

	}

	getAllChallenges() {
		let allChallengeUrl = "challenge/insurer/all";
		this.requestService.get(allChallengeUrl, null).toPromise().then(data => {
			this.activeChallenges = data.activeChallenge;
			this.pastChallenges = data.pastChallenge;
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

	getActiveChallanges() {
		let activeChallanegUrl = "challenge?isActive=true";
		this.requestService.get(activeChallanegUrl, null).toPromise().then(data => {
			this.activeChallenges = data;
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

	closeToaster() {
		this.errorToasterMsg = false
	}

	getpastChallanges() {
		let pastChallanegUrl = "challenge?isActive=false";
		this.requestService.get(pastChallanegUrl, null).toPromise().then((data) => {
			this.pastChallenges = data;
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

	createChalange() {
		this.router.navigateByUrl("/challenge");
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
		}

		if (criteria == 'Oldest') {
			this.activeChallenges.sort((a, b) => {
				return a.createdAt - b.createdAt
			})
			this.pastChallenges.sort((a, b) => {
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
		}

		if (criteria == 'Most Popular') {
			this.activeChallenges.sort((a, b) => {
				return b.acceptedUsersCount - a.acceptedUsersCount
			})
			this.pastChallenges.sort((a, b) => {
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
		}

	}

	reLogin() {
		let id = JSON.parse(localStorage.getItem('timeoutId'))
		clearTimeout(id);
		localStorage.clear();
		this.router.navigateByUrl('login')
	}

}