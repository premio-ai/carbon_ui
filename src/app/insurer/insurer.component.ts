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
    private location: Location,
  ) { }
  challengeId: string
  challengeDetails: any;
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

  checkClick(e) {
    let overviewId = ''
    let dataId = ''
    let activityId = ''
    let discussionId = ''
    let modelId = ''
    if (document.getElementById('n-tab-0')) {
      overviewId = 'n-tab-0'
      dataId = 'n-tab-1'
      activityId = 'n-tab-2'
      discussionId = 'n-tab-3'
      modelId = 'n-tab-4'
    } else {
      overviewId = 'n-tab-2'
      dataId = 'n-tab-3'
      activityId = 'n-tab-4'
      discussionId = 'n-tab-5'
      modelId = 'n-tab-6'
    }

    switch (e.target.outerText) {
      case 'Overview':
        //Heading
        document.getElementsByClassName('bx--tabs__nav-item')[0].classList.add('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[1].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[2].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[3].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[4].classList.remove('bx--tabs__nav-item--selected')
        //Content
        document.getElementById(overviewId).setAttribute('style', ``);
        document.getElementById(dataId).setAttribute('style', `display:none;`);
        document.getElementById(activityId).setAttribute('style', `display:none;`);
        document.getElementById(discussionId).setAttribute('style', `display:none;`);
        document.getElementById(modelId).setAttribute('style', `display:none;`);
        break;
      case 'Data':
        //Heading
        document.getElementsByClassName('bx--tabs__nav-item')[0].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[1].classList.add('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[2].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[3].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[4].classList.remove('bx--tabs__nav-item--selected')
        //Content
        document.getElementById(dataId).setAttribute('style', ``);
        document.getElementById(overviewId).setAttribute('style', `display:none;`);
        document.getElementById(activityId).setAttribute('style', `display:none;`);
        document.getElementById(discussionId).setAttribute('style', `display:none;`);
        document.getElementById(modelId).setAttribute('style', `display:none;`);
        break;
      case 'View Activity':
        //Heading
        document.getElementsByClassName('bx--tabs__nav-item')[0].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[1].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[2].classList.add('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[3].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[4].classList.remove('bx--tabs__nav-item--selected')
        //Content
        document.getElementById(activityId).setAttribute('style', ``);
        document.getElementById(activityId).getElementsByTagName('div')[0].style.display = '';
        document.getElementById(overviewId).setAttribute('style', `display:none;`);
        document.getElementById(dataId).setAttribute('style', `display:none;`);
        document.getElementById(discussionId).setAttribute('style', `display:none;`);
        document.getElementById(modelId).setAttribute('style', `display:none;`);
        break;
      case 'Activity':
        //Heading
        document.getElementsByClassName('bx--tabs__nav-item')[0].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[1].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[2].classList.add('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[3].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[4].classList.remove('bx--tabs__nav-item--selected')
        //Content
        document.getElementById(activityId).setAttribute('style', ``);
        document.getElementById(overviewId).setAttribute('style', `display:none;`);
        document.getElementById(dataId).setAttribute('style', `display:none;`);
        document.getElementById(discussionId).setAttribute('style', `display:none;`);
        document.getElementById(modelId).setAttribute('style', `display:none;`);
        break;
      case 'Discussion':
        //Heading
        document.getElementsByClassName('bx--tabs__nav-item')[0].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[1].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[2].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[3].classList.add('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[4].classList.remove('bx--tabs__nav-item--selected')
        //Content
        document.getElementById(discussionId).setAttribute('style', ``);
        document.getElementById(overviewId).setAttribute('style', `display:none;`);
        document.getElementById(dataId).setAttribute('style', `display:none;`);
        document.getElementById(activityId).setAttribute('style', `display:none;`);
        document.getElementById(modelId).setAttribute('style', `display:none;`);
        break;
      case 'View Model':
        //Heading
        document.getElementsByClassName('bx--tabs__nav-item')[0].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[1].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[2].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[3].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[4].classList.add('bx--tabs__nav-item--selected')
        //Content
        document.getElementById(modelId).setAttribute('style', ``);
        document.getElementById(modelId).getElementsByTagName('div')[0].style.display = '';
        document.getElementById(overviewId).setAttribute('style', `display:none;`);
        document.getElementById(dataId).setAttribute('style', `display:none;`);
        document.getElementById(activityId).setAttribute('style', `display:none;`);
        document.getElementById(discussionId).setAttribute('style', `display:none;`);
        break;
      case 'Models':
        //Heading
        document.getElementsByClassName('bx--tabs__nav-item')[0].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[1].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[2].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[3].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[4].classList.add('bx--tabs__nav-item--selected')
        //Content
        document.getElementById(modelId).setAttribute('style', ``);
        document.getElementById(overviewId).setAttribute('style', `display:none;`);
        document.getElementById(dataId).setAttribute('style', `display:none;`);
        document.getElementById(activityId).setAttribute('style', `display:none;`);
        document.getElementById(discussionId).setAttribute('style', `display:none;`);
        break;
      default:
        break;
    }
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
