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
  fileData: any;
  fileArray: any[] = []
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

  setSampleData(acceptedFiles) {
    console.log(acceptedFiles, "---acceptedFiles---")
    const file = acceptedFiles.file;

    this.fileArray.push(file)
    console.log(this.fileArray, "---this.fileArray---78")
    if (this.fileArray.length>0) {
      this.uploadSampleData()
    }
  }

  uploadSampleData() {
    this.fileData = new FormData();
    this.fileArray.map( (dt, i) => {
      console.log(i, "---fileIndex---85")
      this.fileData.append(`files`, dt);
    })
    console.log(this.fileData, "---this.fileData---90")
    const formData = this.fileData;
    this.fileData.delete();
    console.log(this.fileData, "---this.fileData()---93")
    let tempData = []
    console.log(formData, "---formData---95")
    this.fileArray = []
    console.log(this.fileArray, "---this.fileArray---97")
    // this.requestService.post('upload', formData).subscribe(data => {
    //   data.map(dt => {
    //     let data = {
    //       path: dt.filename,
    //       downloadCount: 0
    //     }
    //     // tempData.push(data)
    //     this.stepTwo.sampleDataFile.push(data)
    //   })
    //   console.log(this.stepTwo.sampleDataFile, "---this.stepTwo.sampleDataFile---107")
    // })
    // this.stepTwo.sampleDataFile = tempData
  }

  previous() {
    this.goPrevious.emit();
  }

  next() {
    // TODO: uncomment
     this.goNext.emit(this.phases);

    // if (this.phases.length > 0) {
    //   if (this.stepTwo.description.length > 0 && this.stepTwo.guidence.length > 0 && this.stepTwo.passingScore && this.stepTwo.dataVisualFile.length > 0 && this.stepTwo.sampleDataFile.length > 0) {
    //     let tempData = {
    //       description: this.stepTwo.description,
    //       guidence: this.stepTwo.guidence,
    //       passingScore: this.stepTwo.passingScore,
    //       dataVisualFile: this.stepTwo.dataVisualFile,
    //       sampleDataFile: this.stepTwo.sampleDataFile
    //     }
    //     this.phases.push(tempData)
    //     this.goNext.emit(this.phases);
    //   } else {
    //     this.phasesError = true
    //   }
    // } else {
    //   if (this.stepTwo.description.length > 0 && this.stepTwo.guidence.length > 0 && this.stepTwo.passingScore && this.stepTwo.dataVisualFile.length > 0 && this.stepTwo.sampleDataFile.length > 0) {
    //     let tempData = {
    //       description: this.stepTwo.description,
    //       guidence: this.stepTwo.guidence,
    //       passingScore: this.stepTwo.passingScore,
    //       dataVisualFile: this.stepTwo.dataVisualFile,
    //       sampleDataFile: this.stepTwo.sampleDataFile
    //     }
    //     this.phases.push(tempData)
    //     this.goNext.emit(this.phases);
    //   } else {
    //     this.phasesError = true
    //   }
    // }
  }

}