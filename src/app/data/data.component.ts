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

  ngOnInit() {
  }

  getDownloadsCount() {
    let url = 'challenge/' + this.challengeDetails._id;
    this.requestService.get(url, null).subscribe(data => {
      // this.downloadsCount = data.downloadsCount;
    })
  }

  async downloadFile() {
    if (this.challengeDetails) {
      let docName = this.challengeDetails.phases[0].sampleDataFile[0] || ''
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

          let downloadUrl = 'challenge/downloadsCount/' + this.challengeDetails._id;
          this.requestService.put(downloadUrl, null).subscribe(data => {
            // this.getDownloadsCount();
          })
        })
      } else {
        // this.docError = true
      }
    }
  }

}
