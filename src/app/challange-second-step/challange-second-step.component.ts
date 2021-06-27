import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RequestService } from '../request.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challange-second-step',
  templateUrl: './challange-second-step.component.html',
  styleUrls: ['./challange-second-step.component.scss']
})
export class ChallangeSecondStepComponent implements OnInit {
  @Output() public goPrevious: EventEmitter<any> = new EventEmitter();
  @Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor(
    private requestService: RequestService,
    private router: Router
  ) { }
  phases: any[] = []
  fileData: any;
  fileArray: any[] = []
  stepTwo: {
    description: string,
    guidance: string,
    passingScore: number,
    dataVisualFile: string,
    sampleDataFile: any
  }
  descriptionError: boolean;
  guidanceError: boolean;
  passingScoreError: boolean;
  dataVisualFileError: boolean;
  sampleDataFileError: boolean;
  bucketName: string;
  subject: Subscription;
  isBtnDisabled: boolean;
  isSampleFileUploading: boolean;
  isDataVisualUploading: boolean;
  fileNameError: boolean

  ngOnInit() {
    this.isBtnDisabled = true;
    this.isSampleFileUploading = false;
    this.isDataVisualUploading = false;
    this.stepTwo = {
      description: "",
      guidance: "",
      passingScore: 0,
      dataVisualFile: '',
      sampleDataFile: []
    }

    this.createTempBucket();
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

  ngDoCheck() {
    if (this.stepTwo.description.length > 0 && this.stepTwo.guidance.length > 0 && this.stepTwo.passingScore && this.stepTwo.dataVisualFile.length > 0 && this.stepTwo.sampleDataFile.length > 0) {
      this.isBtnDisabled = false
    }
  }

  addPhase() {
    if (this.stepTwo.description.length > 0 && this.stepTwo.guidance.length > 0 && this.stepTwo.passingScore && this.stepTwo.dataVisualFile.length > 0 && this.stepTwo.sampleDataFile.length > 0) {
      this.isBtnDisabled = true
      let tempData = {
        description: this.stepTwo.description,
        guidance: this.stepTwo.guidance,
        passingScore: this.stepTwo.passingScore,
        dataVisualFile: this.stepTwo.dataVisualFile,
        sampleDataFile: this.stepTwo.sampleDataFile
      }

      this.phases.push(tempData)
      this.stepTwo = {
        description: "",
        guidance: "",
        passingScore: 0,
        dataVisualFile: '',
        sampleDataFile: []
      }
    } else {
      this.validateData()
    }
  }

  validateData() {
    if (this.stepTwo.description.length == 0) {
      this.descriptionError = true
    } else {
      this.descriptionError = false
    }
    if (this.stepTwo.guidance.length == 0) {
      this.guidanceError = true
    } else {
      this.guidanceError = false
    }
    if (!this.stepTwo.passingScore) {
      this.passingScoreError = true
    } else {
      this.passingScoreError = false
    }
    if (this.stepTwo.dataVisualFile.length == 0) {
      this.dataVisualFileError = true
    } else {
      this.dataVisualFileError = false
    }
    if (this.stepTwo.sampleDataFile.length == 0) {
      this.sampleDataFileError = true
    } else {
      this.sampleDataFileError = false
    }
  }

  getFileName(filePath) {
    let pathArr = filePath.split('/')
    if (pathArr[2].length > 22) {
      return pathArr[2].substring(0, 22) + '...'
    } else {
      return pathArr[2]
    }
  }

  getSampleFileName(filePath) {
    let pathArr = filePath.split('/')
    if (pathArr[2].length > 22) {
      return pathArr[2].substring(0, 22) + '...'
    } else {
      return pathArr[2]
    }
  }

  removeDataVisual(i) {
    this.phases[i].dataVisualFile = '';
  }

  removeSampleDataFile(phaseIndex, fileIndex) {
    this.phases[phaseIndex].sampleDataFile.splice(fileIndex, 1)
  }

  removeStepTwoDataVisual() {
    this.stepTwo.dataVisualFile = ''
  }

  removeStepTwoSampleDataFile(index) {
    this.stepTwo.sampleDataFile.splice(index, 1)
  }

  setDataVisual(acceptedFiles, index) {
    let ind;
    if (index >= 0) {
      ind = index
    } else {
      if (this.phases.length > 0) {
        ind = this.phases.length
      } else {
        ind = 0
      }
    }
    const file = acceptedFiles.file;
    const formData = new FormData();
    formData.append('files', file);
    let payload = {
      tempBucketName: this.bucketName,
      phaseNo: ind,
      fileType: 'dataVisual'
    }
    formData.append('uploadInfo', JSON.stringify(payload))

    this.isDataVisualUploading = true
    this.uploadDataVisual(formData, index)
  }

  uploadDataVisual(formData, index) {
    this.subject = this.requestService.post('upload', formData).subscribe(data => {
      this.isDataVisualUploading = false
      if (index >= 0) {
        this.phases[index].dataVisualFile = data.filePath
      } else {
        this.stepTwo.dataVisualFile = data.filePath
      }
    })
  }

  uploadSampleData(file: any, index: number) {
    let ind: number;
    if (index >= 0) {
      ind = index
    } else {
      if (this.phases.length > 0) {
        ind = this.phases.length
      } else {
        ind = 0
      }
    }
    if (file.name == 'test.csv' || file.name == 'train.csv') {
      this.isSampleFileUploading = true
      this.fileNameError = false
      this.fileData = new FormData();
      this.fileData.append('files', file);

      let payload = {
        tempBucketName: this.bucketName,
        phaseNo: ind,
        fileType: 'sampleDataFile'
      }
      this.fileData.append('uploadInfo', JSON.stringify(payload))
      const formData = this.fileData;
      this.fileData.delete('FormData');
      this.fileArray = []
      if (formData) {
        this.subject = this.requestService.post('upload', formData).subscribe(data => {
          this.isSampleFileUploading = false
          if (data && data.filePath.length>0) {          
            let fileObj = {
              path: data.filePath,
              downloadCount: 0
            }
            if (index >= 0) {
              this.phases[ind].sampleDataFile.push(fileObj)
            } else {
              this.stepTwo.sampleDataFile.push(fileObj)
            }
          }
        })
      }
    } else {
      this.fileNameError = true
    }

  }

  ngOnDestroy() {
    this.subject.unsubscribe()
  }

  setSampleData(data) {
    this.stepTwo.sampleDataFile.push(data[0])
  }

  previous() {
    this.goPrevious.emit();
  }

  next() {
    this.bucketName = '';
    if (this.phases.length > 0) {
      if (this.stepTwo.description.length > 0 && this.stepTwo.guidance.length > 0 && this.stepTwo.passingScore && this.stepTwo.dataVisualFile.length > 0 && this.stepTwo.sampleDataFile.length > 0) {
        let tempData = {
          description: this.stepTwo.description,
          guidance: this.stepTwo.guidance,
          passingScore: this.stepTwo.passingScore,
          dataVisualFile: this.stepTwo.dataVisualFile,
          sampleDataFile: this.stepTwo.sampleDataFile
        }
        this.phases.push(tempData)
        this.goNext.emit(this.phases);
      } else {
        this.validateData();
      }
    } else {
      if (this.stepTwo.description.length > 0 && this.stepTwo.guidance.length > 0 && this.stepTwo.passingScore && this.stepTwo.dataVisualFile.length > 0 && this.stepTwo.sampleDataFile.length > 0) {
        let tempData = {
          description: this.stepTwo.description,
          guidance: this.stepTwo.guidance,
          passingScore: this.stepTwo.passingScore,
          dataVisualFile: this.stepTwo.dataVisualFile,
          sampleDataFile: this.stepTwo.sampleDataFile
        }
        this.phases.push(tempData)
        this.goNext.emit(this.phases);
      } else {
        this.validateData();
      }
    }
  }

}