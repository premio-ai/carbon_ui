import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { APP_URL } from '../../config/config';
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
    private requestService: RequestService
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
    this.requestService.post(url, null).subscribe(data => {
      this.bucketName = data.bucketName
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
    this.requestService.post('upload', formData).subscribe(data => {
      this.stepOne.modelUploadedPath = data.filePath
    })
  }

  async downloadFile(phaseIndex, fileIndex) {
		if (this.challengeDetails) {

			let docName = this.challengeDetails.phases[phaseIndex].sampleDataFile[fileIndex].path || ''
      // let docUrl = APP_URL + docName
      let docUrl = 'http://s3.eu-gb.cloud-object-storage.appdomain.cloud/code-bucket/' + docName

      let payload = {
        filePath : docName
      }
      this.requestService.post('upload/downloadObject', payload).subscribe( data => {
        console.log(data, "---data---85")
      })

			// if (docUrl.length) {
			// 	await fetch(docUrl).then(async res => {
			// 		return await res.blob()
			// 	}).then(blob => {
			// 		var a = document.createElement("a");
			// 		document.body.appendChild(a);
			// 		const url = URL.createObjectURL(blob);

			// 		a.href = url;
			// 		a.download = "File";
			// 		a.click();
			// 		window.URL.revokeObjectURL(url);

			// 		let downloadUrl = 'challenge/fileDownloadsCount/' + this.challengeDetails._id;
			// 		let payload = {
			// 			challengeId: this.challengeDetails._id,
			// 			phaseId: this.challengeDetails.phases[phaseIndex].phaseId,
			// 			fileId: this.challengeDetails.phases[phaseIndex].sampleDataFile[fileIndex]
			// 		}
			// 		this.requestService.put(downloadUrl, payload).subscribe(data => {
			// 			// this.getDownloadsCount();
			// 		})
			// 	})
			// } else {
			// 	// this.docError = true
			// }
		}
	}

  nextStep() {
    this.goNext.emit(this.stepOne)
  }

}
