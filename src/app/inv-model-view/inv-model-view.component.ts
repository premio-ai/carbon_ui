import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-inv-model-view',
  templateUrl: './inv-model-view.component.html',
  styleUrls: ['./inv-model-view.component.scss']
})

export class InvModelViewComponent implements OnInit {

  constructor(
    private router: Router,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }
  modelId: any;
  modelDetails: any;
  challengeId: any;
  innovatorId: any;
  phaseId: any;
  challengeDetails: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params) {
        this.modelId = params.id
      }
    });

    this.getSubmission(this.modelId)
  }

  getDate(timeStamp) {
		let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
		return date;
	}

  getSubmission(id) {
    let url = 'submissionAllChallenge/' + id;
    this.requestService.get(url, null).subscribe(data => {
      this.modelDetails = data[0];
      this.challengeId = data[0].challengeId;
      this.phaseId = data[0].phaseId;
      this.innovatorId = data[0].innovatorId._id;

      this.getChallengeDetails(this.challengeId);
    })
  }

  getChallengeDetails(id) {
    let url = 'challenge/' + id;
    this.requestService.get(url, null).subscribe(data => {
      this.challengeDetails = data;
    })
  }

  navigateBack() {
    this.location.back()
  }

  async downloadFile() {
    if (this.challengeDetails) {
      let docName = this.challengeDetails.phases[0].sampleDataFile[0] || ''
      let docUrl = 'http://localhost:3000/' + docName
      
      if (docUrl.length) {
        let imgUrl = 'http://localhost:3000/bc8af0906fb566c23cac8ebfe6480d5c.png'
        let pdfUrl = 'http://localhost:3000/eb99fd7d5386810a6b33363e9da82d73d.pdf'

        await fetch(docUrl).then(async res => {
          return await res.blob()
        }).then(blob => {
          var a = document.createElement("a");
          document.body.appendChild(a);
          const url = URL.createObjectURL(blob);

          a.href = url;
          a.download = "File";
          a.click();
          window.URL.revokeObjectURL(url);
        })
      } else {
        // this.docError = true
      }
    }
  }

  seePerformance() {
    this.router.navigateByUrl('see-performance/' + this.modelId)
  }



}
