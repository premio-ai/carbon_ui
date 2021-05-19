import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inv-challenge-tile',
  templateUrl: './inv-challenge-tile.component.html',
  styleUrls: ['./inv-challenge-tile.component.scss']
})
export class InvChallengeTileComponent implements OnInit {

  @Input() challenge: any;

 constructor(private requestService: RequestService,
    private router: Router
    ) { }
  activeChallenges: any[];
  pastChallenges: any[];

  ngOnInit() {}

  getDate(time) {
    time = parseInt(time);
    let dt = new Date(time);
    return dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
  }

  viewChalange(id) {
    let url = 'challenge/' + id
    this.router.navigateByUrl(url);
  }

}
