import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-submission-step-one',
  templateUrl: './submission-step-one.component.html',
  styleUrls: ['./submission-step-one.component.scss']
})
export class SubmissionStepOneComponent implements OnInit {
  @Input() challengeDetails: any;
  @Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor(
    private requestService: RequestService
  ) { }
  docError: boolean
  stepOne: {
    modelUploadedPath: any
  }

  ngOnInit() {
    this.stepOne = {
      modelUploadedPath: ''
    };
  }

  setModel(acceptedFiles) {
    const file = acceptedFiles.file;
    const formData = new FormData();
    formData.append('files', file);

    this.uploadDataVisual(formData)
  }

  uploadDataVisual(formData) {
    this.requestService.post('upload', formData).subscribe(data => {
      this.stepOne.modelUploadedPath = data[0].filename
    })
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
        this.docError = true
      }
    }
  }

  nextStep() {
    this.goNext.emit(this.stepOne)
  }

}
