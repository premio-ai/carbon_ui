import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Input() challengeDetails: any;
  constructor(
    private requestService: RequestService
  ) { }
  editedPhase: String
  isEdit: Boolean;

  ngOnInit() {
    this.isEdit = false
    this.editedPhase = ''
  }

  getDownloadsCount() {
    let url = 'challenge/' + this.challengeDetails._id;
    this.requestService.get(url, null).subscribe(data => {
      // this.downloadsCount = data.downloadsCount;
    })
  }

  editPhase(index) {
    this.isEdit = true
    this.editedPhase = this.challengeDetails.phases[index].description
  }

  savePhase(phaseId) {
    let url = 'challenge/updatePhase/' + this.challengeDetails._id;
    let payload = {
      phaseId: phaseId,
      description: this.editedPhase
    }
    this.requestService.put(url, payload).subscribe(data => {
      this.isEdit = false;
      this.getChallengeDetails(this.challengeDetails._id)
    })
  }

  getChallengeDetails(challengeId) {
    this.requestService.get("/"+challengeId, null).subscribe( data => {
      this.challengeDetails = data
    })
  }

  async downloadFile(phaseIndex, fileIndex) {
    if (this.challengeDetails) {

      let docName = this.challengeDetails.phases[phaseIndex].sampleDataFile[fileIndex].path || ''
      let docUrl = 'http://localhost:3000/' + docName

      if (docUrl.length) {
        let imgUrl = 'http://localhost:3000/bc8af0906fb566c23cac8ebfe6480d5c.png'
        let pdfUrl = 'http://localhost:3000/eb99fd7d5386810a6b33363e9da82d73d.pdf'

        await fetch(docUrl).then(async res => {
          return await res.blob()
        }).then(blob => {
          var a = document.createElement("a");
          document.body.appendChild(a);
          const url = URL.createObjectURL(blob);

          a.href = url;
          a.download = "File";
          a.click();
          window.URL.revokeObjectURL(url);

          let downloadUrl = 'challenge/fileDownloadsCount/' + this.challengeDetails._id;
          let payload = {
            challengeId: this.challengeDetails._id,
            phaseId: this.challengeDetails.phases[phaseIndex].phaseId,
            fileId: this.challengeDetails.phases[phaseIndex].sampleDataFile[fileIndex]
          }
          this.requestService.put(downloadUrl, payload).subscribe(data => {
            // this.getDownloadsCount();
          })
        })
      } else {
        // this.docError = true
      }
    }
  }

}
