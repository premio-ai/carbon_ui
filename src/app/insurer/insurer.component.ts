import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MESSAGES, ROLE } from '../../config/config';

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
  routePhase: any;
  userSessionExpired: boolean;
  routeAuthError: boolean;


  ngOnInit() {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'))
    this.routeAuthError = false;
    if (userDetails && userDetails._id) {
      if (userDetails.role == ROLE.INSURER) {
        let challengeId = ''
        this.userSessionExpired = false;
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
        this.routeAuthError = true;
      }
    } else {
      this.router.navigateByUrl('')
    }
  }

  ngAfterViewInit() {
    let activePhaseId = ''
    this.activatedRoute.queryParams.subscribe(params => {
      activePhaseId = params.activePhaseId
      if (activePhaseId) {
        let phaseNo = this.challengeDetails.phases.findIndex(dt => {
          if (dt.phaseId == activePhaseId) {
            return true
          }
        })

        this.routePhase = {
          phaseId: activePhaseId,
          phaseNo: phaseNo
        }
      }
    })
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
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[0].classList.add('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[1].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[2].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[3].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[4].classList.remove('bx--tabs--scrollable__nav-item--selected')
        //Content
        document.getElementsByName('overview_tab')[0].setAttribute('style', ``);
        document.getElementsByName('data_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('activity_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('discussion_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('model_tab')[0].setAttribute('style', `display:none;`);

        break;
      case 'Data':
        //Heading
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[0].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[1].classList.add('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[2].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[3].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[4].classList.remove('bx--tabs--scrollable__nav-item--selected')
        //Content
        document.getElementsByName('data_tab')[0].setAttribute('style', ``);
        document.getElementsByName('overview_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('activity_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('discussion_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('model_tab')[0].setAttribute('style', `display:none;`);

        break;
      case 'View Activity':
        //Heading
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[0].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[1].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[2].classList.add('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[3].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[4].classList.remove('bx--tabs--scrollable__nav-item--selected')
        //Content
        document.getElementsByName('activity_tab')[0].setAttribute('style', ``);
        document.getElementsByName('activity_tab')[0].getElementsByTagName('div')[0].style.display = '';
        document.getElementsByName('overview_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('data_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('discussion_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('model_tab')[0].setAttribute('style', `display:none;`);

        break;
      case 'Activity':
        //Heading
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[0].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[1].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[2].classList.add('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[3].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[4].classList.remove('bx--tabs--scrollable__nav-item--selected')
        //Content
        document.getElementsByName('activity_tab')[0].setAttribute('style', ``);
        document.getElementsByName('activity_tab')[0].getElementsByTagName('div')[0].style.display = '';
        document.getElementsByName('overview_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('data_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('discussion_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('model_tab')[0].setAttribute('style', `display:none;`);

        break;
      case 'Discussion':
        //Heading
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[0].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[1].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[2].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[3].classList.add('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[4].classList.remove('bx--tabs--scrollable__nav-item--selected')
        //Content
        document.getElementsByName('discussion_tab')[0].setAttribute('style', ``);
        document.getElementsByName('overview_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('activity_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('data_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('model_tab')[0].setAttribute('style', `display:none;`);

        break;
      case 'View Model':
        //Heading
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[0].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[1].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[2].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[3].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[4].classList.add('bx--tabs--scrollable__nav-item--selected')
        //Content
        document.getElementsByName('model_tab')[0].setAttribute('style', ``);
        document.getElementsByName('model_tab')[0].getElementsByTagName('div')[0].style.display = '';
        document.getElementsByName('overview_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('data_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('discussion_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('activity_tab')[0].setAttribute('style', `display:none;`);

        break;
      case 'Models':
        //Heading
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[0].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[1].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[2].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[3].classList.remove('bx--tabs--scrollable__nav-item--selected')
        document.getElementsByClassName('bx--tabs--scrollable__nav-item')[4].classList.add('bx--tabs--scrollable__nav-item--selected')
        //Content
        document.getElementsByName('model_tab')[0].setAttribute('style', ``);
        document.getElementsByName('model_tab')[0].getElementsByTagName('div')[0].style.display = '';
        document.getElementsByName('overview_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('data_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('discussion_tab')[0].setAttribute('style', `display:none;`);
        document.getElementsByName('activity_tab')[0].setAttribute('style', `display:none;`);

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
      if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
        this.userSessionExpired = true
        setTimeout(() => {
          this.reLogin();
        }, 3000)
      }
    })
  }

  getSubmissionChallenge(id) {
    let url = 'submissionAllChallenge/challenge/' + id;
    this.requestService.get(url, null).toPromise().then(data => {
      this.submissionChallengeDetails = data;
    }).catch(err => {
      if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
        this.userSessionExpired = true
        setTimeout(() => {
          this.reLogin();
        }, 3000)
      }
    })
  }

  navigate() {
    this.router.navigateByUrl('dashboard')
  }

  navigateBack() {
    this.location.back()
  }

  reLogin() {
    let id = JSON.parse(localStorage.getItem('timeoutId'))
		clearTimeout(id);
    localStorage.clear();
    this.router.navigateByUrl('login')
  }

}
