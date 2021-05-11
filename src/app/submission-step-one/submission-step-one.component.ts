import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-submission-step-one',
  templateUrl: './submission-step-one.component.html',
  styleUrls: ['./submission-step-one.component.scss']
})
export class SubmissionStepOneComponent implements OnInit {

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

  nextStep() {
    this.goNext.emit(this.stepOne)
  }

}
