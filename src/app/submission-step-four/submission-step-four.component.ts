import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submission-step-four',
  templateUrl: './submission-step-four.component.html',
  styleUrls: ['./submission-step-four.component.scss']
})
export class SubmissionStepFourComponent implements OnInit {
  @Input() challengeSubmissionData: any;
  @Input() isChallengeAccepted: boolean;

  @Output() public goPrevious: EventEmitter<any> = new EventEmitter();
  @Output() public goNext: EventEmitter<any> = new EventEmitter();
  @Output() public goToStepOne: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router
  ) { }
  stepFour: {
    description: string,
    guidence: string,
    score: number
  }

  ngOnInit() {
  }

  previous() {
  }

  toStepOne() {
    this.goToStepOne.emit()
  }

  viewModel(modelId) {
    this.router.navigateByUrl('invmodel-view/' + modelId)
  }

  seePerformance(modelId) {
    this.router.navigateByUrl('see-performance/' + modelId)
  }

  async downloadFile(modelpath) {
    if (modelpath) {
      // let docName = this.challengeDetails.phases[0].sampleDataFile[0] || ''
      let docUrl = 'http://localhost:3000/' + modelpath

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

}