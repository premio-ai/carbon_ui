import { Component, OnInit } from "@angular/core";
import { RequestService } from "../request.service";
import { Router } from "@angular/router";

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
			if (this.userDetails.role == 'Insurer') {				
				this.errorToasterMsg = false;
				this.userSessionExpired = false;
				this.getActiveChallanges();
				this.getpastChallanges();
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

	getActiveChallanges() {
		let activeChallanegUrl = "challenge?isActive=true";
		this.requestService.get(activeChallanegUrl, null).toPromise().then(data => {
			this.activeChallenges = data;
		}).catch(err => {
			this.errorToaster();
			if (err.status == 500) {
				this.userSessionExpired = true
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
			if (err.status == 500) {
				this.userSessionExpired = true
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
		localStorage.clear();
		this.router.navigateByUrl('login')
	}

}