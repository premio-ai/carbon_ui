import { Component, OnInit, Renderer2, Inject, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '../request.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';
import { element } from 'protractor';

@Component({
  selector: 'app-insurer',
  templateUrl: './insurer.component.html',
  styleUrls: ['./insurer.component.scss']
})
export class InsurerComponent implements OnInit {
  @ViewChild("app-insurer", null) divView: ElementRef;

  constructor(private requestService: RequestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private renderer: Renderer2,
    @Inject(DOCUMENT) document
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

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      // console.log(params, "---params---63")
      if (params.activeTab && params.activeTab == 'Activity') {
        // active
        document.getElementById('n-tab-2').getElementsByTagName('div')[0].style.display = '';

        document.getElementsByClassName('bx--tabs__nav-item')[0].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[2].classList.add('bx--tabs__nav-item--selected')

        //Inactive
        document.getElementById('n-tab-0').setAttribute('style', `display:none;`);
        // document.getElementById('n-tab-1').setAttribute('style', `display:none;`);
        // document.getElementById('n-tab-3').setAttribute('style', `display:none;`);
        // document.getElementById('n-tab-4').setAttribute('style', `display:none;`);
      }
      if (params.activeTab && params.activeTab == 'Model') {
        // active
        document.getElementById('n-tab-4').getElementsByTagName('div')[0].style.display = '';

        document.getElementsByClassName('bx--tabs__nav-item')[0].classList.remove('bx--tabs__nav-item--selected')
        document.getElementsByClassName('bx--tabs__nav-item')[4].classList.add('bx--tabs__nav-item--selected')

        //Inactive
        document.getElementById('n-tab-0').setAttribute('style', `display:none;`);
        document.getElementById('n-tab-1').setAttribute('style', `display:none;`);
        document.getElementById('n-tab-2').setAttribute('style', `display:none;`);
        document.getElementById('n-tab-3').setAttribute('style', `display:none;`);
      }
    });
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
