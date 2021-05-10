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
  formData: any

  stepTwo: {
    description: string,
    guidence: string,
    score: number,
    dataVisualFile: string,
    sampleDataFile: any
  }

  ngOnInit() {
    this.stepTwo = {
      description: "",
      guidence: "",
      score: 0,
      dataVisualFile: '',
      sampleDataFile: []
    }
  }

  addPhase() {
    console.log(this.stepTwo, "---this.stepTwo---39")
    if (this.stepTwo.description.length > 0 && this.stepTwo.guidence.length > 0 && this.stepTwo.score && this.stepTwo.dataVisualFile.length>0 && this.stepTwo.sampleDataFile.length>0) {
      let tempData = {
        description: this.stepTwo.description,
        guidence: this.stepTwo.guidence,
        score: this.stepTwo.score,
        dataVisualFile: this.stepTwo.dataVisualFile,
        sampleDataFile: this.stepTwo.sampleDataFile
      }

      console.log(tempData, "---tempData---")
      this.phases.push(tempData)
      this.stepTwo = {
        description: "",
        guidence: "",
        score: 0,
        dataVisualFile: '',
        sampleDataFile: []
      }
    }
  }

  setDataVisual(acceptedFiles) {
    const file = acceptedFiles.file;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', 'dataSetImage')
    this.formData = formData
  }

  uploadDataVisual() {
    console.log(this.formData, "---this.formData---64")

    this.requestService.post('upload', this.formData).subscribe(data => {
      console.log(data, "---data---73")
      this.stepTwo.dataVisualFile = data[0].filename
    })
  }

  setSampleData(acceptedFiles) {
    const file = acceptedFiles.file;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', 'dataSetImage')
    this.formData = formData
  }

  uploadSampleData() {
    console.log(this.formData, "---this.formData---87")

    this.requestService.post('upload', this.formData).subscribe(data => {
      console.log(data, "---data---90")
      let tempArr = []
      data.map( dt => {
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

      if (this.phases.length>0) {      
        this.goNext.emit(this.phases);
      } else  {
        this.phasesError = true
      }
  }

}