import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-challange-tile',
  templateUrl: './challange-tile.component.html',
  styleUrls: ['./challange-tile.component.scss']
})
export class ChallangeTileComponent implements OnInit {

  @Input() challange: any;
  constructor() { }

  ngOnInit() {
  }

  getDate(time) {
    let date = new Date(time);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  }
}
