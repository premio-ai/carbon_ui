import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landingPage.html',
  styleUrls: ['./landingPage.scss']
})

export class LandingComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

  ngOnInit() {}

  gotoLogin() {
    this.router.navigateByUrl('login');
  }

}
