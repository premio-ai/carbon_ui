import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { APP_URL } from '../../config/config';

@Component({
  selector: 'app-inv-model-view',
  templateUrl: './inv-model-view.component.html',
  styleUrls: ['./inv-model-view.component.scss']
})

export class InvModelViewComponent implements OnInit {

  constructor(
    private router: Router,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }
  pageOffset: number;
  totalPage: number;
  pageNo: number;
  modelId: string;
  modelDetails: any;
  challengeId: string;
  innovatorId: string;
  phaseId: string;
  nextModelId: string;
  nextPhaseIndex: number;
  challengeDetails: any;
  isEdit: boolean;
  set_new_modelName: String;
  allSubmitOfChallenge: any[] = [];
  submissionIndex: number;
  appUrl: String;
  submissionStatus: any;
  modelSummary: any;
  imageUrlArr: string;
  sampleFileArr: any[] = [];
  showBtn: boolean;
  showAccordion: boolean;
  leaderboardData: any[] = [];
  errorToasterMsg: boolean;
  userSessionExpired: boolean;
  routeAuthError: boolean;

  ngOnInit() {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.routeAuthError = false;
    if (userDetails && userDetails._id) {
      if (userDetails.role == 'Innovator') {
        this.errorToasterMsg = false;
        this.userSessionExpired = false;
        this.pageNo = 1;
        this.pageOffset = 0;
        this.totalPage = 1;
        this.appUrl = APP_URL;
        this.activatedRoute.params.subscribe((params: Params) => {
          if (params) {
            this.modelId = params.id;
            this.getSubmission(this.modelId);
            this.getModelSummary(this.modelId);
          }
        });

        this.showBtn = false;
        this.isEdit = false;
        this.set_new_modelName = '';
      } else {
        console.log("---else---marked")
        this.routeAuthError = true;
      }
    } else {
      this.router.navigateByUrl('');
    }
  }

  getAllSubmitOfChallenge(challengeId) {
    let url = 'submissionAllChallenge/allSubmitOfChallenge/' + challengeId;
    this.requestService.get(url, null).toPromise().then(data => {
      this.allSubmitOfChallenge = data;
    }).catch(err => {
      if (err.status == 500) {
        this.userSessionExpired = true
      }
    })
  }

  getLeaderboardOfChallenge() {
    let url = 'leaderboard/' + this.challengeId + '/' + this.phaseId;
    let params = {
      skip: this.pageOffset
    }

    this.requestService.get(url, params).toPromise().then(data => {
      this.totalPage = Math.ceil(data.count / 10);
      this.leaderboardData = data.list;
    }).catch(err => {
      if (err.status == 500) {
        this.userSessionExpired = true
      }
    })
  }

  prevPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.pageOffset = (this.pageNo - 1) * 10;
      this.getLeaderboardOfChallenge();
    }
  }

  nextPage() {
    if (this.pageNo < (this.totalPage)) {
      this.pageNo++;
      this.pageOffset = (this.pageNo - 1) * 10;
      this.getLeaderboardOfChallenge();
    }
  }

  editModelName() {
    this.isEdit = true;
  }

  saveModelName() {
    let url = 'submissionAllChallenge/' + this.modelId;
    let payload = {
      modelName: this.set_new_modelName
    }
    this.requestService.put(url, payload).toPromise().then(data => {
      this.isEdit = false;
      this.getSubmission(this.modelId);
    }).catch(err => {
      this.errorToaster();
      if (err.status == 500) {
        this.userSessionExpired = true
      }
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

  getDate(timeStamp) {
    let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
    return date;
  }

  getSubmission(id) {
    let url = 'submissionAllChallenge/' + id;
    this.requestService.get(url, null).toPromise().then(data => {
      this.modelDetails = data[0];
      this.challengeId = data[0].challengeId;
      this.phaseId = data[0].phaseId;
      this.innovatorId = data[0].innovatorId._id;

      this.getChallengeDetails(this.challengeId);
      this.getAllSubmitOfChallenge(this.challengeId);
      this.getLeaderboardOfChallenge();
    }).catch(err => {
      if (err.status == 500) {
        this.userSessionExpired = true
      }
    })
  }

  getModelSummary(id) {
    let url = 'submissionAllChallenge/modelSummary/' + id;
    this.requestService.get(url, null).toPromise().then(data => {
      this.modelSummary = data;
    }).catch(err => {
      if (err.status == 500) {
        this.userSessionExpired = true
      }
    })
  }

  getFailureMsg() {
    if (this.modelSummary && this.modelSummary.metricsStatus) {
      return this.modelSummary.summary.review_fn_message;
    }
  }

  getUploadStatus() {
    if (this.modelSummary && this.modelSummary.metricsStatus) {
      return this.modelSummary.metricsStatus.upload;
    }
  }

  getTrainingStatus() {
    if (this.modelSummary && this.modelSummary.metricsStatus) {
      return this.modelSummary.metricsStatus.training;
    }
  }

  getTestingStatus() {
    if (this.modelSummary && this.modelSummary.metricsStatus) {
      return this.modelSummary.metricsStatus.test_status;
    }
  }

  async displayImage() {
    let payload = {
      filePath: ''
    }
    this.challengeDetails.phases.map(dt => {
      if (dt.phaseId == this.modelDetails.phaseId) {
        payload.filePath = dt.dataVisualFile;
      }
    })

    this.requestService.post('upload/getImage', payload).toPromise().then(data => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      this.imageUrlArr = data.blob;
    }).catch(err => {
      if (err.status == 500) {
        this.userSessionExpired = true
      }
    })
  }

  getPerformanceStatus() {
    if (this.modelSummary && this.modelSummary.metricsStatus) {
      return this.modelSummary.metricsStatus.scoreStatus;
    }
  }

  getChallengeDetails(id) {
    let url = 'challenge/' + id;
    this.requestService.get(url, null).toPromise().then(data => {
      this.challengeDetails = data;
      this.submissionIndex = data.phases.findIndex(dt => { return dt.phaseId == this.phaseId });
      this.displayImage();
      this.getSampleFileArr();
      this.getNextPhaseDetails();
    }).catch(err => {
      if (err.status == 500) {
        this.userSessionExpired = true
      }
    })
  }

  getPassAccuracy() {
    if (this.challengeDetails) {
      let score = this.challengeDetails.phases[this.nextPhaseIndex].passingScore;
      return score + '%';
    }
  }

  showAccuracy() {
    if (this.challengeDetails.phases[this.nextPhaseIndex] && this.challengeDetails.phases[this.nextPhaseIndex].passingScore) {
      return true;
    } else {
      return false;
    }
  }

  getNextPhaseDetails() {
    let index = this.challengeDetails.phases.findIndex(dt => {
      if (dt.phaseId == this.phaseId) {
        return true;
      }
    })
    this.nextPhaseIndex = index + 1;
    if (this.nextPhaseIndex < this.challengeDetails.phases.length) {
      let nextPhaseId = this.challengeDetails.phases[this.nextPhaseIndex].phaseId;
      let url = 'submissionAllChallenge/getLatestSubmitByPhase/' + nextPhaseId;
      this.requestService.get(url, null).toPromise().then(data => {
        if (data.length > 0) {
          this.nextModelId = data[0]._id;
          this.showBtn = true;
        }
      }).catch(err => {
        if (err.status == 500) {
          this.userSessionExpired = true
        }
      })
    } else {
      this.showBtn = false;
    }
  }

  enterNextPhase() {
    this.router.navigateByUrl('invmodel-view/' + this.nextModelId);
  }

  getAccordionTitle() {
    if (this.nextPhaseIndex) {
      if (this.nextPhaseIndex < this.challengeDetails.phases.length) {
        this.showAccordion = true;
        let indStr = (this.nextPhaseIndex + 1).toString();

        if (indStr[indStr.length - 1] == '1') {
          return `Next Phase ${indStr}st of ${this.challengeDetails.phases.length}`;
        } else if (indStr[indStr.length - 1] == '2') {
          return `Next Phase ${indStr}nd of ${this.challengeDetails.phases.length}`;
        } else if (indStr[indStr.length - 1] == '3') {
          return `Next Phase ${indStr}rd of ${this.challengeDetails.phases.length}`;
        } else {
          return `Next Phase ${indStr}th of ${this.challengeDetails.phases.length}`;
        }
      } else {
        this.showAccordion = false;
      }
    }
  }

  getEntryPhaseCount() {
    let indStr = (this.nextPhaseIndex + 1).toString();

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

  getSampleFileArr() {
    if (this.challengeDetails) {
      this.challengeDetails.phases.filter(dt => {
        if (dt.phaseId == this.phaseId) {
          this.sampleFileArr = dt.sampleDataFile;
        }
      })
    }
  }

  navigateBack() {
    this.location.back();
  }

  async downloadFile() {
    if (this.challengeDetails) {
      let newDocName = '';
      this.sampleFileArr.find(dt => {
        if (dt.path.endsWith('train.csv')) {
          newDocName = dt.path;
        }
      })

      let payload = {
        filePath: newDocName
      }
      this.requestService.post('upload/downloadObject', payload).toPromise().then(data => {
        var blob = this.dataURItoBlob(data.blob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = "train.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      }).catch(err => {
        this.errorToaster();
        if (err.status == 500) {
          this.userSessionExpired = true
        }
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

  seePerformance() {
    this.router.navigateByUrl('see-performance/' + this.modelId);
  }

  challengeTitle(challengeId) {
    this.router.navigateByUrl('invaccepted/' + challengeId);
  }

  invChallenges() {
    this.router.navigateByUrl('invchallenges');
  }

  viewModel(modelId) {
    this.router.navigateByUrl('invmodel-view/' + modelId);
  }

  reLogin() {
    localStorage.clear();
    this.router.navigateByUrl('login')
  }

}
