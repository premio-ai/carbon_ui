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
	activeChallenges: any[];
	submittedActiveChallenges: any[] = [];
	bookmarkedChallenges: any[] = []

	ngOnInit() {
		this.notificationLoading = true;
		this.challengeCounts = 0;
		this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
		if (this.userDetails) {
			//TODO: check notifications API before deployment
			this.getNotifications();
			this.getChallengeCounts();
			this.getInnovatorChallangeCount();

			// setInterval(() => {
			// 	this.getNotifications()
			// }, 60000)
		}
	}


	getInnovatorChallangeCount() {
		let allActiveChallanegUrl = "challenge/all";
		let params = {
			skip: 0,
			offset: 0
		}

		this.requestService.get(allActiveChallanegUrl, params).subscribe(data => {
			this.activeChallenges = data.list;
			this.getSubmission();
			this.getBookmarkedChallenges();
		})
	}

	getBookmarkedChallenges() {
		let url = "bookmarkChallenge";
		this.requestService.get(url, null).subscribe(data => {

			let tempData = []
			this.activeChallenges.filter(dt => {
				data.map(res => {
					if (dt._id == res.challengeId) {
						tempData.push(dt)
					}
				})
			})
			this.bookmarkedChallenges = tempData;
		})
	}

	getSubmission() {
		let url = "submissionAllChallenge";
		this.requestService.get(url, null).subscribe(data => {
			let tempData = []
			this.activeChallenges.filter(dt => {
				data.map(res => {
					if (dt._id == res.challengeId) {
						tempData.push(dt)
					}
				})
			})
			this.submittedActiveChallenges = tempData
		})
	}

	getChallengeCounts() {
		this.requestService.get('challenge/counts', null).subscribe(data => {
			this.challengeCounts = data
		})
	}

	getNotifications() {
		let url = 'userNotification'
		this.requestService.get(url, null).subscribe(data => {
			this.notifications = data;
			this.notificationLoading = false
		})
		setTimeout(() => {
			this.getNotifications();
		}, Number((60 + Math.random()*10).toFixed(0)) *1000 );
	}

	logoRoute() {
		if (this.userDetails.role == 'Insurer') {
			this.router.navigateByUrl('/')
		}
		if (this.userDetails.role == 'Innovator') {
			this.router.navigateByUrl('invdash')
		}
	}

	navigate() {
		if (this.userDetails.role == 'Insurer') {
			this.router.navigateByUrl('/')
		}
		if (this.userDetails.role == 'Innovator') {
			this.router.navigateByUrl('invdash')
		}
	}

	viewNotification(notify) {
		if (notify.title == MESSAGES.NEW_CHALLENGE_POST) {
			this.requestService.put('userNotification/' + notify._id, {
				isSeen: true
			}).subscribe(data => {
				this.router.navigateByUrl('invaccepted/' + notify.elementId)
			})
		}
		if (notify.title == MESSAGES.NEW_MODEL_SUBMITTED) {
			this.requestService.put('userNotification/' + notify._id, {
				isSeen: true
			}).subscribe(data => {
				this.router.navigateByUrl('invmodel-view/' + notify.elementId)
			})
		}
	}

	logout() {
		localStorage.clear();
		this.router.navigateByUrl('login')
	}

}
