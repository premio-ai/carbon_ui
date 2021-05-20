import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Input() submissionChallengeDetails: any;
  @Input() challengeDetails: any;
  constructor() { }
  selectedPhase: any[] = []
  phaseNo: any
  phaseOneSubmission: any

  ngOnInit() {
    this.phaseNo = 1
  }

  ngOnChanges() {
    if (this.challengeDetails && this.submissionChallengeDetails) {
      this.initialPhase()

      this.phaseOneSubmission = this.submissionChallengeDetails.length
    }
  }

  getCreationDate(dt) {
    let date = moment(dt).format('DD/MM/YYYY')
    return date;
  }

  getDate(timeStamp) {
		let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
		return date;
	}
  
  initialPhase() {
    let tempData = []
    this.submissionChallengeDetails.filter(dt => {
      if (dt.phaseId == this.challengeDetails.phases[0].phaseId) {
        tempData.push(dt)
      }
    })

    this.selectedPhase = tempData
  }

  selectPhase(phaseId, phaseNo) {
    this.phaseNo = phaseNo

    let tempData = []
    this.submissionChallengeDetails.filter(dt => {
      this.challengeDetails.phases.map(res => {
        if (dt.phaseId == phaseId && res.phaseId == phaseId) {
          tempData.push(dt)
        }
      })
    })

    this.selectedPhase = tempData
  }

  exportexcel() {
    let element = document.getElementById('excel-table'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
	}

}