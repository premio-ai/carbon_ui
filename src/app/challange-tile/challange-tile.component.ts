import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-challange-tile',
  templateUrl: './challange-tile.component.html',
  styleUrls: ['./challange-tile.component.scss']
})
export class ChallangeTileComponent implements OnInit {

  @Input() challange: any;

  constructor(
    private requestService: RequestService,
    private router: Router
    ) { }
  activeChallenges: any[];
  pastChallenges: any[];

  ngOnInit() {}

  getDate(timeStamp) {
		let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
		return date;
  }
  
  getExpiryDate(dt) {
    let date = moment(dt).format('DD/MM/YYYY')
    return date;
  }

  viewChalange(id) {
    let url = 'challenge/' + id
    this.router.navigateByUrl(url);
  }
}
