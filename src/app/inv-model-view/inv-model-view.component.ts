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
  modelId: any;
  modelDetails: any;
  challengeId: any;
  innovatorId: any;
  phaseId: any;
  challengeDetails: any;
  isEdit: boolean;
  set_new_modelName: String;
  allSubmitOfChallenge: any[] = [];
  submissionIndex: number;
  appUrl: String;
  submissionStatus: any
  modelSummary: any
  imageUrlArr: string
  sampleFileArr: any[] = []

  ngOnInit() {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'))
    if (userDetails && userDetails._id) {
      this.appUrl = APP_URL
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params) {
          this.modelId = params.id
          this.getSubmission(this.modelId)
          this.getModelSummary(this.modelId)
        }
      });

      this.isEdit = false;
      this.set_new_modelName = '';
    } else {
      this.router.navigateByUrl('login')
    }
  }

  getAllSubmitOfChallenge(challengeId) {
    let url = 'submissionAllChallenge/allSubmitOfChallenge/' + challengeId;
    this.requestService.get(url, null).toPromise().then(data => {
      this.allSubmitOfChallenge = data
      // this.submissionIndex = data.findIndex( dt => dt._id == this.modelId)
    }).catch(err => {
      localStorage.clear();
      this.router.navigateByUrl('login')
    })
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
      this.getSubmission(this.modelId)
    }).catch(err => {
      localStorage.clear();
      this.router.navigateByUrl('login')
    })
  }

  enterNextPhase() {
    let nextModelId = this.allSubmitOfChallenge[this.submissionIndex + 1]._id;
    this.router.navigateByUrl('invmodel-view/' + nextModelId)
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
      // this.submissionStatus = data.submissionStatus[0]

      this.getChallengeDetails(this.challengeId);
      this.getAllSubmitOfChallenge(this.challengeId);
    }).catch(err => {
      localStorage.clear();
      this.router.navigateByUrl('login')
    })
  }

  getModelSummary(id) {
    let url = 'submissionAllChallenge/modelSummary/' + id;
    this.requestService.get(url, null).toPromise().then(data => {
      this.modelSummary = data
    }).catch(err => {
      localStorage.clear();
      this.router.navigateByUrl('login')
    })
  }

  getFailureMsg() {
    if (this.modelSummary) {
      return this.modelSummary.summary.review_fn_message
    }
  }

  getUploadStatus() {
    if (this.modelSummary) {
      return this.modelSummary.metricsStatus.upload
      // return this.modelSummary.summary.upload_status
    }
  }

  getTrainingStatus() {
    if (this.modelSummary) {
      return this.modelSummary.metricsStatus.training
      // if (this.modelSummary.summary.training_status == null) {
      //   return 'FAILED'
      // } else {
      //   return this.modelSummary.summary.training_status
      // }
    }
  }

  getTestingStatus() {
    if (this.modelSummary) {
      return this.modelSummary.metricsStatus.test_status
      // if (this.modelSummary.summary.testing_status == null) {
      //   return 'FAILED'
      // } else {
      //   return this.modelSummary.summary.test_status
      // }
    }
  }

  async displayImage() {
    let payload = {
      filePath: ''
    }
    this.challengeDetails.phases.map(dt => {
      if (dt.phaseId == this.modelDetails.phaseId) {
        payload.filePath = dt.dataVisualFile
      }
    })

    this.requestService.post('upload/getImage', payload).toPromise().then(data => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      this.imageUrlArr = data.blob
    }).catch(err => {
      localStorage.clear();
      this.router.navigateByUrl('login')
    })

  }

  getPerformanceStatus() {
    if (this.modelSummary) {
      return this.modelSummary.metricsStatus.scoreStatus
      // if (this.modelSummary.metricsStatus == 'RUNNING') {
      //   return 'PENDING'
      // } else if (this.modelSummary.metricsStatus.training == 'COMPLETE' && this.modelSummary.metricsStatus.testing == 'COMPLETE') {
      //   return 'COMPLETE'
      // } else if (this.modelSummary.metricsStatus.training == 'COMPLETE' && this.modelSummary.metricsStatus.testing == 'INCOMPLETE') {
      //   return 'INCOMPLETE'
      // } else if (this.modelSummary.metricsStatus.training == 'INCOMPLETE' && this.modelSummary.metricsStatus.testing == 'INCOMPLETE') {
      //   return 'INCOMPLETE'
      // } else if (this.modelSummary.metricsStatus == 'INCOMPLETE') {
      //   return 'INCOMPLETE'
      // }
    }
  }

  getChallengeDetails(id) {
    let url = 'challenge/' + id;
    this.requestService.get(url, null).toPromise().then(data => {
      this.challengeDetails = data;
      this.submissionIndex = data.phases.findIndex(dt => { return dt.phaseId == this.phaseId })
      this.displayImage();
      this.getSampleFileArr();
    }).catch(err => {
      localStorage.clear();
      this.router.navigateByUrl('login')
    })
  }

  getSampleFileArr() {
    if (this.challengeDetails) {
      this.challengeDetails.phases.filter(dt => {
        if (dt.phaseId == this.phaseId) {
          this.sampleFileArr = dt.sampleDataFile
        }
      })
    }
  }

  navigateBack() {
    this.location.back()
  }

  async downloadFile(filePath) {
    if (this.challengeDetails) {
      let docName = filePath

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

  seePerformance() {
    this.router.navigateByUrl('see-performance/' + this.modelId)
  }

  challengeTitle(challengeId) {
    this.router.navigateByUrl('invaccepted/' + challengeId)
  }

  invChallenges() {
    this.router.navigateByUrl('invchallenges')
  }

  viewModel(modelId) {
    this.router.navigateByUrl('invmodel-view/' + modelId)
  }

}
