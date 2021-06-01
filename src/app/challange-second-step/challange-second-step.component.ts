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
    guidence: string,
    passingScore: number,
    dataVisualFile: string,
    sampleDataFile: any
  }
  descriptionError: boolean;
  guidanceError: boolean;
  passingScoreError: boolean;
  dataVisualFileError: boolean;
  sampleDataFileError: boolean;

  ngOnInit() {
    this.stepTwo = {
      description: "",
      guidence: "",
      passingScore: 0,
      dataVisualFile: '',
      sampleDataFile: []
    }
  }

  addPhase() {
    if (this.stepTwo.description.length > 0 && this.stepTwo.guidence.length > 0 && this.stepTwo.passingScore && this.stepTwo.dataVisualFile.length > 0 && this.stepTwo.sampleDataFile.length > 0) {
      let tempData = {
        description: this.stepTwo.description,
        guidence: this.stepTwo.guidence,
        passingScore: this.stepTwo.passingScore,
        dataVisualFile: this.stepTwo.dataVisualFile,
        sampleDataFile: this.stepTwo.sampleDataFile
      }

      this.phases.push(tempData)
      this.stepTwo = {
        description: "",
        guidence: "",
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
    if (this.stepTwo.guidence.length == 0) {
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
    this.requestService.post('upload', formData).subscribe(data => {
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
      if (this.stepTwo.description.length > 0 && this.stepTwo.guidence.length > 0 && this.stepTwo.passingScore && this.stepTwo.dataVisualFile.length > 0 && this.stepTwo.sampleDataFile.length > 0) {
        let tempData = {
          description: this.stepTwo.description,
          guidence: this.stepTwo.guidence,
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
      if (this.stepTwo.description.length > 0 && this.stepTwo.guidence.length > 0 && this.stepTwo.passingScore && this.stepTwo.dataVisualFile.length > 0 && this.stepTwo.sampleDataFile.length > 0) {
        let tempData = {
          description: this.stepTwo.description,
          guidence: this.stepTwo.guidence,
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