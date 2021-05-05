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
    console.log("challange ..... ", this.challange)
    
  }

  getDate(time) {
    time = parseInt(time);
    let dt = new Date(time);
    return dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
  }
}
