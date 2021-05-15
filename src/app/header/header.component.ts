import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MESSAGES } from '../../config/message';

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

	ngOnInit() {
		this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
		setInterval(() => {
			this.getNotifications()				// TODO: uncomment before push
		}, 60000)
	}

	getNotifications() {
		let url = 'userNotification'
		this.requestService.get(url).subscribe( data => {
			this.notifications = data;
		})
	}

	logoRoute() {
		if (this.userDetails.role == 'Insurer') {
			this.router.navigateByUrl('/')
		}
		if (this.userDetails.role == 'Innovator') {
			this.router.navigateByUrl('invchallenges')
		}
	}

	viewNotification(notify) {
		if (notify.title == MESSAGES.NEW_CHALLENGE_POST) {
			this.requestService.put('invaccepted/' + notify._id, {
				isSeen: true
			}).subscribe( data => {
				this.router.navigateByUrl('challenge/' + notify.elementId)
			})
		}
		if (notify.title == MESSAGES.NEW_MODEL_SUBMITTED) {
			this.requestService.put('userNotification/' + notify._id, {
				isSeen: true
			}).subscribe( data => {
				this.router.navigateByUrl('invmodel-view/:id' + notify.elementId)
			})
		}
	}

	logout() {
		localStorage.clear();
		this.router.navigateByUrl('login')
	}

}
