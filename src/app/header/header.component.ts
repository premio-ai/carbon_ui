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
		// setInterval(() => {
			this.getNotifications()
		// }, 5000)
	}

	getNotifications() {
		let url = 'userNotification'
		this.requestService.get(url).subscribe( data => {
			console.log(data, "---data---18")
			this.notifications = data;
		})
	}

	viewNotification(notify) {
		console.log(notify, "---notify---31")
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

}
