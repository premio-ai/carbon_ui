import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IconNameNotFoundError } from 'carbon-components-angular';
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

  ngOnInit() {
    this.isBtnDisabled = true
    this.isFileUploading = false
    this.createTempBucket();

    // if (this.enterPhaseId.length>0) {
    //   // this.stepOne = {
    //   //   modelUploadedPath: '',
    //   //   phaseId: this.enterPhaseId
    //   // }
    //   this.selectPhase(this.enterPhaseId)
    // } else {
    //   this.stepOne = {
    //     modelUploadedPath: '',
    //     phaseId: ''
    //   };
    // }
    // this.stepOne = {
    //   modelUploadedPath: '',
    //   phaseId: ''
    // };
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
  }

  ngDoCheck() {
    if (this.stepOne.modelUploadedPath.length > 0 && this.stepOne.phaseId.length > 0) {
      this.isBtnDisabled = false
    }
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

  selectPhase(type) {
    if (type.length > 0) {
      this.stepOne.phaseId = type
      this.phaseIndex = this.challengeDetails.phases.findIndex(dt => { return dt.phaseId == type })
    } else {
      this.stepOne.phaseId = type.item.id
      this.phaseIndex = this.challengeDetails.phases.findIndex(dt => { return dt.phaseId == type.item.id })
    }

    // this.stepOne.phaseId = type.item.id
    // this.phaseIndex = this.challengeDetails.phases.findIndex(dt => { return dt.phaseId == type.item.id })
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
      localStorage.clear();
      this.router.navigateByUrl('login')
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

  cancel() {
    this.cancelSubmit.emit()
  }

}
