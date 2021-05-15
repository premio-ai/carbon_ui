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
	) {}
	activeChallenges: any[];
	pastChallenges: any[];

	ngOnInit() {
		let userDetails = JSON.parse(localStorage.getItem('userDetails'))
		if (userDetails && userDetails._id) {			
			this.getActiveChallanges();
			this.getpastChallanges();
		} else {
			this.router.navigateByUrl('login')
		}
	}

	getActiveChallanges() {
		let activeChallanegUrl = "challenge?isActive=true";
		this.requestService.get(activeChallanegUrl).subscribe(data => {
		  this.activeChallenges = data;
		})
	}

	getpastChallanges() {
		let pastChallanegUrl = "challenge?isActive=false";
		this.requestService.get(pastChallanegUrl).subscribe((data) => {
			this.pastChallenges = data;
		});
	}

	createChalange() {
		this.router.navigateByUrl("/challenge");
	}

}