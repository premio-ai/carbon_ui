import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-insurer',
  templateUrl: './insurer.component.html',
  styleUrls: ['./insurer.component.scss']
})
export class InsurerComponent implements OnInit {

  constructor(private requestService: RequestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }
  challengeId: string
  challengeDetails: any[];
  submissionChallengeDetails: any[];

  ngOnInit() {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'))
    if (userDetails && userDetails._id) {
      let challengeId = ''
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params) {
          challengeId = params.id
          this.challengeId = params.id
        }
      });

      this.getChallengeDetails(challengeId);
      this.getSubmissionChallenge(challengeId);

      (<any>window).disqus_config = this.getConfig();

      var d = document, s: any = d.createElement('script');
      s.src = 'https://meanapp.disqus.com/embed.js';
      s.setAttribute('data-timestamp', + new Date());
      (d.head || d.body).appendChild(s);
    } else {
      this.router.navigateByUrl('login')
    }
  }

  getConfig() {
    let _self = this;
    return function () {
      this.page.url = window.location.href;
      this.page.identifier = _self.challengeId;
      this.language = 'en';
    };
  }

  getChallengeDetails(id) {
    let url = 'challenge/' + id;
    this.requestService.get(url, null).toPromise().then(data => {
      this.challengeDetails = data;
    }).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
  }

  getSubmissionChallenge(id) {
    let url = 'submissionAllChallenge/challenge/' + id;
    this.requestService.get(url, null).toPromise().then(data => {
      this.submissionChallengeDetails = data;
    }).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
  }

  navigateBack() {
    this.location.back()
  }

}
