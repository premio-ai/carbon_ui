import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-challange-second-step',
  templateUrl: './challange-second-step.component.html',
  styleUrls: ['./challange-second-step.component.scss']
})
export class ChallangeSecondStepComponent implements OnInit {
  @Output() public goPrevious: EventEmitter<any> = new EventEmitter();
  @Output() public goNext: EventEmitter<any> = new EventEmitter();

  constructor() { }
  phases: any[] = []
  phasesError: boolean

  stepTwo: {
    description: string,
    guidence: string,
    score: number
  }

  ngOnInit() {
    this.stepTwo = {
      description: "",
      guidence: "",
      score: 0
    }
  }

  addPhase() {
    let tempData = {
      description: this.stepTwo.description,
      guidence: this.stepTwo.guidence,
      score: this.stepTwo.score
    }

    this.phases.push(tempData)
    this.stepTwo = {
      description: "",
      guidence: "",
      score: 0
    }
  }

  nextDataSet(file) {
    console.log(file, "----file----46")
  }

  onDropped(files) {
    console.log(files, "---files---46")
  }

  fileBrowseHandler(files) {
    console.log(files, "---files---46")
  }

  upload(files: File[]){
console.log(files, "---files---50")
    //pick from one of the 4 styles of file uploads below
    // this.uploadAndProgress(files);
  }

  // uploadAndProgress(files: File[]){
  //   console.log(files)
  //   var formData = new FormData();
  //   Array.from(files).forEach(f => formData.append('file',f))
    
  //   this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
  //     .subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.percentDone = Math.round(100 * event.loaded / event.total);
  //       } else if (event instanceof HttpResponse) {
  //         this.uploadSuccess = true;
  //       }
  //   });
  // }

  previous() {
    this.goPrevious.emit();
  }

  next() {
    // TODO: uncomment
    // this.goNext.emit(this.phases);

  //   if (this.phases.length>0) {      
  //     this.goNext.emit(this.phases);
  //   } else  {
  //     this.phasesError = true
  //   }
  }

}