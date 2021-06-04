import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-challange-second-step',
  templateUrl: './challange-second-step.component.html',
  styleUrls: ['./challange-second-step.component.scss']
})
export class ChallangeSecondStepComponent implements OnInit {
  @Output() public goPrevious: EventEmitter<any> = new EventEmitter();
  @Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor(
    private requestService: RequestService
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

  ngOnInit() {
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
    this.requestService.post(url, null).subscribe( data => {
      console.log(data, "---data---47")
    
      this.bucketName = data.bucketName
console.log(this.bucketName, "---this.bucketName---51")
    }) 
  }

  addPhase() {
    if (this.stepTwo.description.length > 0 && this.stepTwo.guidance.length > 0 && this.stepTwo.passingScore && this.stepTwo.dataVisualFile.length > 0 && this.stepTwo.sampleDataFile.length > 0) {
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

  setDataVisual(acceptedFiles) {
    const file = acceptedFiles.file;
    const formData = new FormData();
    formData.append('files', file);

    this.uploadDataVisual(formData)
  }

  uploadDataVisual(formData) {
    let payload = {
      formData: formData,
      tempBucketName: this.bucketName 
    }
    console.log(payload, "---payload---119")
    this.requestService.post('upload', payload).toPromise().then(data => {
      console.log(data, "---data---104")

    //   data.blob()
    // })
    //   .then(blob => {
    //     var a = document.createElement("a");
    //     document.body.appendChild(a);
    //     const url = URL.createObjectURL(blob);

    //     a.href = url;
    //     a.download = "File";
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //   })


    this.stepTwo.dataVisualFile = data[0].filename
    })
  }

  setSampleData(data) {
    this.stepTwo.sampleDataFile.push(data[0])
  }

  previous() {
    this.goPrevious.emit();
  }

  next() {
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