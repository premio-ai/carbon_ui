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
  phasesError: boolean

  stepTwo: {
    description: string,
    guidence: string,
    passingScore: number,
    dataVisualFile: string,
    sampleDataFile: any
  }

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
        score: this.stepTwo.passingScore,
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
    }
  }

  setDataVisual(acceptedFiles) {
    const file = acceptedFiles.file;
    const formData = new FormData();
    formData.append('file', file);

    this.uploadDataVisual(formData)
  }

  uploadDataVisual(formData) {
    this.requestService.post('upload', formData).subscribe(data => {
      this.stepTwo.dataVisualFile = data[0].filename
    })
  }

  setSampleData(acceptedFiles) {
    const file = acceptedFiles.file;
    const formData = new FormData();
    formData.append('file', file);

    this.uploadSampleData(formData)
  }

  uploadSampleData(formData) {
    this.requestService.post('upload', formData).subscribe(data => {
      let tempArr = []
      data.map(dt => {
        tempArr.push(dt.filename)
      })

      this.stepTwo.sampleDataFile = tempArr
    })
  }

  previous() {
    this.goPrevious.emit();
  }

  next() {
    // TODO: uncomment
    // this.goNext.emit(this.phases);
    // if (this.phases.length>0) {      
    //   this.goNext.emit(this.phases);
    // } else  {
    //   this.phasesError = true
    // }

    if (this.phases.length > 0) {
      // this.goNext.emit(this.phases);
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
        this.phasesError = true
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
        this.phasesError = true
      }
    }
  }

}