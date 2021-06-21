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
  showCongratDiv: boolean;
  isEdit: boolean;
  set_new_modelName: String;
  allSubmitOfChallenge: any[] = [];
  submissionIndex: number;
  appUrl: String;
  submissionStatus: any
  modelSummary: any

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
  
      setTimeout(() => {
        this.showCongratDiv = true;
      }, 10000)
  
      this.isEdit = false;
      this.set_new_modelName = '';
    } else {
			this.router.navigateByUrl('login')
		}
  }

  getAllSubmitOfChallenge(challengeId) {
    let url = 'submissionAllChallenge/allSubmitOfChallenge/' + challengeId;
    this.requestService.get(url, null).toPromise().then( data => {
      let tempData = []
      data.map( dt => {
        tempData.push(dt.modelData)
      })
      this.allSubmitOfChallenge = tempData
      this.submissionIndex = tempData.findIndex( dt => dt._id == this.modelId)
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
    let nextModelId = this.allSubmitOfChallenge[this.submissionIndex+1]._id;
    this.router.navigateByUrl('invmodel-view/' + nextModelId)
  }

  getDate(timeStamp) {
    let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
    return date;
  }

  getSubmission(id) {
    let url = 'submissionAllChallenge/' + id;
    this.requestService.get(url, null).toPromise().then(data => {
      this.modelDetails = data.submissionData[0];
      this.challengeId = data.submissionData[0].challengeId;
      this.phaseId = data.submissionData[0].phaseId;
      this.innovatorId = data.submissionData[0].innovatorId._id;
      this.submissionStatus = data.submissionStatus[0]

      this.getChallengeDetails(this.challengeId);
      this.getAllSubmitOfChallenge(this.challengeId);
    }).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
  }

  getModelSummary(id) {
    let url = 'submissionAllChallenge/modelSummary/' + id;
    this.requestService.get(url, null).toPromise().then( data => {
      this.modelSummary = data
    }).catch( err => {
      localStorage.clear();
			this.router.navigateByUrl('login')
    })
  }

  getUploadStatus() {
    if (this.modelSummary) {
      return this.modelSummary.summary.upload_status
    }
  }

  getTrainingStatus() {
    if (this.modelSummary) {
      return this.modelSummary.summary.training_status
    }
  }

  getTestingStatus() {
    if (this.modelSummary) {
      return this.modelSummary.summary.test_status
    }
  }

  getPerformanceStatus() {
    if (this.modelSummary) {
      if (this.modelSummary.metricsStatus == 'RUNNING') {
        return 'PENDING'
      } else if (this.modelSummary.metricsStatus.training == 'COMPLETE' && this.modelSummary.metricsStatus.testing == 'COMPLETE') {
        return 'COMPLETE'
      } else if (this.modelSummary.metricsStatus.training == 'COMPLETE' && this.modelSummary.metricsStatus.testing == 'INCOMPLETE') {
        return 'INCOMPLETE'
      }
    }
  }

  getChallengeDetails(id) {
    let url = 'challenge/' + id;
    this.requestService.get(url, null).toPromise().then(data => {
      this.challengeDetails = data;
    }).catch(err => {
			localStorage.clear();
			this.router.navigateByUrl('login')
		})
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
				var a = document.createElement("a");
				document.body.appendChild(a);
				const url = URL.createObjectURL(new Blob([data.blob], { type: 'text/plain' }));

				a.href = url;
				a.download = "File";
				a.click();
				window.URL.revokeObjectURL(url);
			}).catch(err => {
        localStorage.clear();
        this.router.navigateByUrl('login')
      })
    }
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
