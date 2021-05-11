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
    formData.append('file', file);

    this.uploadDataVisual(formData)
  }

  uploadDataVisual(formData) {
    this.requestService.post('upload', formData).subscribe(data => {
      this.stepOne.modelUploadedPath = data[0].filename
    })
  }

  downloadFile() {
    // http://localhost:3000/bc8af0906fb566c23cac8ebfe6480d5c.png

    let imgUrl = 'http://localhost:3000/bc8af0906fb566c23cac8ebfe6480d5c.png'

    let pdfUrl = 'http://localhost:3000/eb99fd7d5386810a6b33363e9da82d73d.pdf'

let res;
this.requestService.get('bc8af0906fb566c23cac8ebfe6480d5c.png').subscribe(response => {
  res = response
})

var newBlob = new Blob([imgUrl], { type: "image/png" })


var a = document.createElement("a");
    document.body.appendChild(a);
    // a.style = "display: none";
    const url = window.URL.createObjectURL( newBlob );
    console.log(url, "---url---52")

    a.href = url;
    a.download = "File";
    a.click();
    window.URL.revokeObjectURL(url);    


  }

  nextStep() {
    this.goNext.emit(this.stepOne)
  }

}
