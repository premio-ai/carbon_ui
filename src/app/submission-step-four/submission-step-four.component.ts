import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import * as moment from 'moment';

@Component({
  selector: 'app-submission-step-four',
  templateUrl: './submission-step-four.component.html',
  styleUrls: ['./submission-step-four.component.scss']
})
export class SubmissionStepFourComponent implements OnInit {
  @Input() challengeSubmissionData: any;
  @Input() challengeDetails: any;
  @Input() isChallengeAccepted: boolean;
  @Input() phasesSubmissionComplete: boolean;

  @Output() public goPrevious: EventEmitter<any> = new EventEmitter();
  @Output() public goNext: EventEmitter<any> = new EventEmitter();
  @Output() public goToStepOne: EventEmitter<any> = new EventEmitter();
  @Output() public enterPhase: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private requestService: RequestService
  ) { }
  stepFour: {
    description: string,
    guidence: string,
    score: number
  }
  totalPhases: number
  showLess: boolean
  errorToasterMsg: boolean;
  userSessionExpired: boolean;

  ngOnInit() {
    this.showLess = true
    this.errorToasterMsg = false;
    this.userSessionExpired = false;
    this.totalPhases = this.challengeDetails.phases.length
  }

  toStepOne() {
    this.goToStepOne.emit()
  }

  getPhasesCount(phaseId) {
    let index = this.challengeDetails.phases.findIndex(dt => { return dt.phaseId == phaseId })
    return index;
  }

  getPhasesCountString(phaseId) {
    let index = this.challengeDetails.phases.findIndex(dt => { return dt.phaseId == phaseId })

    let indStr = (index + 1).toString();

    if (indStr[indStr.length - 1] == '1') {
      return `Phase ${indStr}st of ${this.challengeDetails.phases.length}`;
    } else if (indStr[indStr.length - 1] == '2') {
      return `Phase ${indStr}nd of ${this.challengeDetails.phases.length}`;
    } else if (indStr[indStr.length - 1] == '3') {
      return `Phase ${indStr}rd of ${this.challengeDetails.phases.length}`;
    } else {
      return `Phase ${indStr}th of ${this.challengeDetails.phases.length}`;
    }
  }

  checkDisabled() {
    if (!this.isChallengeAccepted || moment(moment(this.challengeDetails.expiryDate).format('DD-MM-YYYY')).isBefore(moment(new Date()).format('DD/MM/YYYY'))) {
      return true;
    } else {
      return false;
    }
  }

  getPhasesCountBtn(phaseId) {
    let index = this.challengeDetails.phases.findIndex(dt => { return dt.phaseId == phaseId })

    let indStr = (index + 2).toString();

    if (indStr[indStr.length - 1] == '1') {
      return `Enter Phase ${indStr}st`;
    } else if (indStr[indStr.length - 1] == '2') {
      return `Enter Phase ${indStr}nd`;
    } else if (indStr[indStr.length - 1] == '3') {
      return `Enter Phase ${indStr}rd`;
    } else {
      return `Enter Phase ${indStr}th`;
    }
  }

  showNextBtn(phaseId) {
    let phaseIndex;
    phaseIndex = this.challengeDetails.phases.findIndex(dt => {
      if (dt.phaseId == phaseId) {
        return true
      }
    })

    let displayBtn = false
    if (phaseIndex < (this.challengeDetails.phases.length - 1)) {
      displayBtn = true
    }
    return displayBtn;
  }

  enterPhaseBtn(phaseId) {
    let index = this.challengeDetails.phases.findIndex(dt => { return dt.phaseId == phaseId })
    let newPhaseId = this.challengeDetails.phases[index + 1].phaseId
    this.enterPhase.emit(newPhaseId)
  }

  viewModel(modelId) {
    this.router.navigateByUrl('invmodel-view/' + modelId)
  }

  seePerformance(modelId) {
    this.router.navigateByUrl('see-performance/' + modelId)
  }

  async downloadFile(modelpath) {
    if (modelpath) {
      let payload = {
        filePath: modelpath
      }
      this.requestService.post('upload/downloadZip', payload).toPromise().then(data => {
        var fileName = "submission-model.zip";
        var blob = this.dataURItoBlob(data.blob)

        var a = document.createElement("a");
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }).catch(err => {
        this.errorToaster();
        if (err.status == 500) {
          this.userSessionExpired = true
        }
      })
    }
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

  readMore() {
    this.showLess = false
  }

  readLess() {
    this.showLess = true
  }

  showLessStr(str) {
    return str.substring(0, 100)
  }

  reLogin() {
    localStorage.clear();
    this.router.navigateByUrl('login')
  }

}