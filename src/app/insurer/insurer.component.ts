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
  challengeDetails: any[];
  submissionChallengeDetails: any[];

  ngOnInit() {
    let challengeId = ''
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params) {
        challengeId = params.id
      }
    });

    this.getChallengeDetails(challengeId);
    this.getSubmissionChallenge(challengeId);
  }

  getChallengeDetails(id) {
    let url = 'challenge/' + id;
    this.requestService.get(url, null).subscribe(data => {
      this.challengeDetails = data;
    })
  }

  getSubmissionChallenge(id) {
    let url = 'submissionAllChallenge/challenge/' + id;
    this.requestService.get(url, null).subscribe(data => {
      this.submissionChallengeDetails = data;
    })
  }

  navigateBack() {
    this.location.back()
  }

}
