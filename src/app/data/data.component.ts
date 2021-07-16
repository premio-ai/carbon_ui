import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_URL, MESSAGES } from '../../config/config';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Input() challengeDetails: any;
  constructor(
    private requestService: RequestService,
    private router: Router
  ) { }
  editedPhase: String;
  isEdit: Boolean;
  appUrl: String;
  imageUrl: String;
  imageUrlArr: any[] = [];
  errorToasterMsg: boolean;
  userSessionExpired: boolean;

  ngOnInit() {
    this.appUrl = APP_URL;
    this.isEdit = false;
    this.errorToasterMsg = false;
    this.userSessionExpired = false;
    this.editedPhase = ''
  }

  ngOnChanges() {
    if (this.challengeDetails) {
      this.displayImage()
    }
  }

  getDownloadsCount() {
    let url = 'challenge/' + this.challengeDetails._id;
    this.requestService.get(url, null).subscribe(data => { })
  }

  editPhase(index) {
    this.isEdit = true
    this.editedPhase = this.challengeDetails.phases[index].description
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

  savePhase(phaseId) {
    let url = 'challenge/updatePhase/' + this.challengeDetails._id;
    let payload = {
      phaseId: phaseId,
      description: this.editedPhase
    }
    this.requestService.put(url, payload).toPromise().then(data => {
      this.isEdit = false;
      this.getChallengeDetails(this.challengeDetails._id)
    }).catch(err => {
      this.errorToaster();
      if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
        this.userSessionExpired = true
        setTimeout(() => {
          this.reLogin();
        }, 3000)
      }
    })
  }

  getChallengeDetails(challengeId) {
    this.requestService.get("/" + challengeId, null).toPromise().then(data => {
      this.challengeDetails = data
    }).catch(err => {
      this.errorToaster();
      if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
        this.userSessionExpired = true
        setTimeout(() => {
          this.reLogin();
        }, 3000)
      }
    })
  }

  async displayImage() {
    this.challengeDetails.phases.map(dt => {
      let payload = {
        filePath: dt.dataVisualFile
      }
      this.requestService.post('upload/getImage', payload).toPromise().then(data => {
        var a = document.createElement("a");
        document.body.appendChild(a);
        this.imageUrlArr.push(data.blob)
      }).catch(err => {
        this.errorToaster();
        if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
          this.userSessionExpired = true
          setTimeout(() => {
            this.reLogin();
          }, 3000)
        }
      })
    })
  }

  getDownloadCount(phaseIndex) {
    let count: number;
    this.challengeDetails.phases[phaseIndex].sampleDataFile.find(dt => {
      if (dt.path.endsWith('train.csv')) {
        count = dt.downloadCount
      }
    })
    return count;
  }

  async downloadFile(phaseIndex) {
    if (this.challengeDetails) {
      let newDocName = ''
      let fileIndex: number;
      this.challengeDetails.phases[phaseIndex].sampleDataFile.find((dt, i) => {
        if (dt.path.endsWith('train.csv')) {
          fileIndex = i
          newDocName = dt.path
        }
      })

      let payload = {
        filePath: newDocName
      }

      this.requestService.post('upload/downloadObject', payload).toPromise().then(data => {
        var blob = this.dataURItoBlob(data.blob)
        var a = document.createElement("a");
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = "train.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      }).catch(err => {
        this.errorToaster();
        if (err.error.statusCode == 401 && err.error.message == MESSAGES.SESSION_EXPIRED) {
          this.userSessionExpired = true
          setTimeout(() => {
            this.reLogin();
          }, 3000)
        }
      })

      let downloadUrl = 'challenge/fileDownloadsCount/' + this.challengeDetails._id;
      let payloadData = {
        challengeId: this.challengeDetails._id,
        phaseId: this.challengeDetails.phases[phaseIndex].phaseId,
        fileId: this.challengeDetails.phases[phaseIndex].sampleDataFile[fileIndex]
      }
      this.requestService.put(downloadUrl, payloadData).subscribe(data => { })
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

  reLogin() {
    let id = JSON.parse(localStorage.getItem('timeoutId'))
		clearTimeout(id);
    localStorage.clear();
    this.router.navigateByUrl('login')
  }

}
