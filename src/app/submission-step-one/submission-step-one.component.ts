import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-submission-step-one',
  templateUrl: './submission-step-one.component.html',
  styleUrls: ['./submission-step-one.component.scss']
})
export class SubmissionStepOneComponent implements OnInit {
  @Input() isChallengeAccepted: any;
  @Input() challengeDetails: any;
  @Input() challengeSubmissionData: any;
  @Input() enterPhaseId: string;
  @Output() public goNext: EventEmitter<any> = new EventEmitter();
  @Output() public cancelSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private requestService: RequestService,
    private router: Router
  ) { }
  docError: boolean
  phaseIndex: number
  stepOne: {
    modelUploadedPath: string,
    phaseId: string
  } = {
      modelUploadedPath: '',
      phaseId: ''
    };
  bucketName: String
  isBtnDisabled: boolean
  isFileUploading: boolean
  phasesList: any[] = []
  testlist: any;
  isApiLoading: boolean;
  errorToasterMsg: boolean;

  ngOnInit() {
    this.isBtnDisabled = true
    this.isFileUploading = false
    this.errorToasterMsg = false
    this.createTempBucket();
  }

  ngOnChanges() {
    if (this.challengeDetails && this.challengeSubmissionData) {
      let temp = []
      this.challengeDetails.phases.map((dt, i) => {
        temp.push({
          content: 'Phase' + i,
          id: dt.phaseId
        })
      })

      this.phasesList = temp
    }
    if (this.enterPhaseId && this.enterPhaseId.length > 0) {
      this.selectPhase(this.enterPhaseId)
    }
    if (this.stepOne.phaseId.length > 0) {
      this.selectPhase(this.stepOne.phaseId)
    }
  }

  ngDoCheck() {
    if (this.stepOne.modelUploadedPath.length > 0 && this.stepOne.phaseId.length > 0) {
      this.isBtnDisabled = false
    }
    if (this.stepOne.phaseId.length > 0) {
      this.selectPhase(this.stepOne.phaseId)
    }
  }

  createTempBucket() {
    this.isApiLoading = true;
    let url = 'upload/createTempBucket'
    this.requestService.post(url, null).toPromise().then(data => {
      this.isApiLoading = false;
      this.bucketName = data.bucketName
    }).catch(err => {
      this.isApiLoading = false;
      this.errorToaster();
    })
  }

  errorToaster = (() => {
		this.errorToasterMsg = true
		setTimeout(() => {
			this.errorToasterMsg = false
		}, 3000)
  })

  closeToaster() {
		this.errorToasterMsg = false
	}
  
  selectPhase(phaseId) {
    if (phaseId.length > 0) {
      this.stepOne.phaseId = phaseId
      this.phaseIndex = this.challengeDetails.phases.findIndex(dt => { return dt.phaseId == phaseId })
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

    this.isFileUploading = true
    this.uploadDataVisual(formData)
  }

  uploadDataVisual(formData) {
    this.requestService.post('upload', formData).toPromise().then(data => {
      this.isFileUploading = false
      this.stepOne.modelUploadedPath = data.filePath
    }).catch(err => {
      this.errorToaster();
    })
  }

  getFileName(filePath) {
    let pathArr = filePath.split('/')
    if (pathArr[2].length > 22) {
      return pathArr[2].substring(0, 22) + '...'
    } else {
      return pathArr[2]
    }
  }

  removeUploadedFile() {
    this.stepOne.modelUploadedPath = ''
  }

  async downloadFile(phaseIndex) {
    if (this.challengeDetails) {
      let newDocName = ''
			this.challengeDetails.phases[phaseIndex].sampleDataFile.find( dt => {
				if (dt.path.endsWith('train.csv')) {
					newDocName = dt.path
				}
			})

			let payload = {
				filePath: newDocName
			}

      this.requestService.post('upload/downloadObject', payload).toPromise().then(data => {
        var blob = this.dataURItoBlob(data.blob)
        var a = document.createElement("a");
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = "train.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      }).catch(err => {
        this.errorToaster();
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

  cancel() {
    this.cancelSubmit.emit()
  }

}
