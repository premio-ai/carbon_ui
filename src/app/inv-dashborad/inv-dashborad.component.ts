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

  ngOnInit() {
	this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
	this.getActiveChallanges();
		this.getpastChallanges();
  }

  getActiveChallanges() {
		let activeChallanegUrl = "challenge?isActive=true";
		this.requestService.get(activeChallanegUrl, null).subscribe(data => {
		  console.log("active challange ... ", data)
		  this.activeChallenges = data;
		})
	}

	getpastChallanges() {
		let pastChallanegUrl = "challenge?isActive=false";
		this.requestService.get(pastChallanegUrl, null).subscribe((data) => {
			console.log("active challange ... ",data)
			this.pastChallenges = data;
		});
	}

	createChalange() {
		this.router.navigateByUrl("/challenge");
	}

}
