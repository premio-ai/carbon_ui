import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-submission-step-one',
  templateUrl: './submission-step-one.component.html',
  styleUrls: ['./submission-step-one.component.scss']
})
export class SubmissionStepOneComponent implements OnInit {
  @Input() challengeDetails: any;
  @Input() challengeSubmissionData: any;
  @Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor(
    private requestService: RequestService,
    private router: Router
  ) { }
  docError: boolean
  phaseIndex: number
  stepOne: {
    modelUploadedPath: any
  }
  bucketName: String

  ngOnInit() {
    this.createTempBucket();
    this.stepOne = {
      modelUploadedPath: ''
    };
  }

  createTempBucket() {
    let url = 'upload/createTempBucket'
    this.requestService.post(url, null).toPromise().then(data => {
      this.bucketName = data.bucketName
    }).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
  }

  ngOnChanges() {
    if (this.challengeDetails && this.challengeSubmissionData) {
      this.getPhaseIndex();
    }
  }

  getPhaseIndex() {
		if (this.challengeSubmissionData.length > 0) {
			this.phaseIndex = this.challengeSubmissionData.length
		} else {
      this.phaseIndex = 0
		}
  }
  
  setModel(acceptedFiles) {
    const file = acceptedFiles.file;
    const formData = new FormData();
    formData.append('files', file);

    let payload = {
      tempBucketName: this.bucketName,
      phaseNo: this.phaseIndex,
      fileType: 'modelDataFile'
    }
    formData.append('uploadInfo', JSON.stringify(payload))

    this.uploadDataVisual(formData)
  }

  uploadDataVisual(formData) {
    this.requestService.post('upload', formData).toPromise().then(data => {
      this.stepOne.modelUploadedPath = data.filePath
    }).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
  }

	async downloadFile(phaseIndex, fileIndex) {
    if (this.challengeDetails) {
      let docName = this.challengeDetails.phases[phaseIndex].sampleDataFile[fileIndex].path || ''

      let payload = {
        filePath: docName
      }
      this.requestService.post('upload/downloadObject', payload).toPromise().then(data => {
        var blob = this.dataURItoBlob(data.blob)
        var a = document.createElement("a");
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = "File.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      }).catch(err => {
        localStorage.clear();
        this.router.navigateByUrl('login')
      })
    }
  }

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  nextStep() {
    this.goNext.emit(this.stepOne)
  }

}
