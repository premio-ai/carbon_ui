import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MESSAGES } from '../../config/config';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

	constructor(
		private requestService: RequestService,
		private router: Router
	) { }
	userDetails: any;
	notifications: any;
	challengeCounts: any;
	notificationLoading: boolean;
	showNotification: boolean;
	isEdit: boolean;
	set_new_userName: string;
	errorToasterMsg: boolean;
	userSessionExpired: boolean;

	ngOnInit() {
		this.notificationLoading = true;
		this.showNotification = true;
		this.challengeCounts = 0;
		this.errorToasterMsg = false;
		this.userSessionExpired = false;
		this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
		if (this.userDetails) {
			this.set_new_userName = this.userDetails.fullName
			this.getNotifications();
			if (this.userDetails.role == 'Insurer') {
				this.getInsurerChallengeCounts();
			}
			if (this.userDetails.role == 'Innovator') {
				this.getInnovatorChallangeCount();
			}
		}
	}

	getInnovatorChallangeCount() {
		let allActiveChallanegUrl = "challenge/innovatorCounts";
		this.requestService.get(allActiveChallanegUrl, null).toPromise().then(data => {
			this.challengeCounts = data
		}).catch(err => {
			if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
				this.userSessionExpired = true
				setTimeout(() => {
					this.reLogin();
				}, 3000)
			}
		})
	}

	getInsurerChallengeCounts() {
		this.requestService.get('challenge/insurerCounts', null).toPromise().then(data => {
			this.challengeCounts = data
		}).catch(err => {
			if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
				this.userSessionExpired = true
				setTimeout(() => {
					this.reLogin();
				}, 3000)
			}
		})
	}

	getNotifications() {
		let url = 'userNotification/' + this.userDetails._id
		this.requestService.get(url, null).toPromise().then(data => {
			this.notifications = data;
			this.notificationLoading = false
		}).catch(err => {
			if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
				this.userSessionExpired = true
				setTimeout(() => {
					this.reLogin();
				}, 3000)
			}
		})
		setTimeout(() => {
			this.getNotifications();
		}, Number((60 + Math.random() * 10).toFixed(0)) * 1000);
	}

	clearNotification() {
		this.notificationLoading = true
		this.requestService.put('userNotification/notification/clearAll', this.notifications).toPromise().then(dt => {
			this.notificationLoading = false
			this.getNotifications();
		})
	}

	navigate() {
		if (this.userDetails.role == 'Insurer') {
			this.router.navigateByUrl('dashboard')
		}
		if (this.userDetails.role == 'Innovator') {
			this.router.navigateByUrl('invdash')
		}
	}

	viewNotification(notify) {
		if (notify.title == MESSAGES.NEW_CHALLENGE_POST) {
			this.requestService.put('userNotification/' + notify._id, {
				isSeen: true
			}).toPromise().then(data => {
				this.router.navigateByUrl('invaccepted/' + notify.elementId)
			}).catch(err => {
				if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
					this.userSessionExpired = true
					setTimeout(() => {
						this.reLogin();
					}, 3000)
				}
			})
		}
		if (notify.title == MESSAGES.NEW_MODEL_SUBMITTED) {
			this.requestService.put('userNotification/' + notify._id, {
				isSeen: true
			}).toPromise().then(data => {
				this.router.navigateByUrl('modelReport/' + notify.elementId)
			}).catch(err => {
				if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
					this.userSessionExpired = true
					setTimeout(() => {
						this.reLogin();
					}, 3000)
				}
			})
		}
	}

	editUserName() {
		this.isEdit = true;
	}

	saveUserName() {
		let url = 'auth/updateUserDetails';
		let payload = {
			userName: this.set_new_userName
		}
		this.requestService.put(url, payload).toPromise().then(data => {
			if (data.result == 'Details Updated') {
				this.isEdit = false;
				let updateUserDetails = JSON.parse(localStorage.getItem('userDetails'))
				updateUserDetails.fullName = this.set_new_userName
				localStorage.setItem('userDetails', JSON.stringify(updateUserDetails))
				this.userDetails.fullName = this.set_new_userName
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

	closeToaster() {
		this.errorToasterMsg = false
	}

	reLogin() {
		localStorage.clear();
		this.router.navigateByUrl('login')
	}

	logout() {
		localStorage.clear();
		this.router.navigateByUrl('login')
	}

}
