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
	submittedActiveChallenges: any[]

	ngOnInit() {
		this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
		this.getAllActiveChallanges();
		// this.getpastChallanges();
		// this.getSubmission();
	}

	getAllActiveChallanges() {
		let allActiveChallanegUrl = "challenge/all";
		let params = {
			skip: 0,
			offset: 0
		}

		this.requestService.get(allActiveChallanegUrl, params).subscribe(data => {
			//   this.totalPage = Math.ceil(data.count / 10);
			this.activeChallenges = data.list;
			//   this.getBookmarkedChallenges();
			this.getSubmission();
		})
	}

	getSubmission() {
		let url = "submissionAllChallenge";
		this.requestService.get(url, null).subscribe(data => {
			let tempData = []
			this.activeChallenges.filter( dt => {
				data.map( res => {
					if (dt._id == res.challengeId) {
						tempData.push(dt)
					}
				})
			})
			this.submittedActiveChallenges = tempData
		})
	}

	// getpastChallanges() {
	// 	let pastChallanegUrl = "challenge?isActive=false";
	// 	this.requestService.get(pastChallanegUrl, null).subscribe((data) => {
	// 		console.log("active challange ... ", data)
	// 		this.pastChallenges = data;
	// 	});
	// }


}
