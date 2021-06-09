import { temporaryDeclaration } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Input() submissionChallengeDetails: any;
  @Input() challengeDetails: any;
  constructor(
    private router: Router,
    private requestService: RequestService
  ) { }
  selectedPhase: any[] = [];
  phaseNo: any;
  phaseOneSubmission: any;
  sorting: any[];
  modelUnderTraining: number;
  passedModelsCount: number;
  selectedPhaseId: String;

  ngOnInit() {
    this.modelUnderTraining = 0
    this.passedModelsCount = 0
    this.phaseNo = 0
  }

  ngOnChanges() {
    if (this.challengeDetails && this.submissionChallengeDetails) {
      this.initialPhase()
    }

    this.sorting = [
      { content: 'Model Name' },
      { content: 'User Invited' },
      { content: 'Model Uploaded' },
      { content: 'Score' }
    ];
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
    this.selectedPhaseId = this.challengeDetails.phases[0].phaseId

    let tempData = []
    this.submissionChallengeDetails.map( dt => {
      if (dt.phaseId == this.selectedPhaseId) {
        tempData.push(dt)
      }
    })
    this.selectedPhase = tempData
    this.trainingModels()
  }

  selectPhase(phaseId, phaseNo) {
    this.phaseNo = phaseNo
    this.passedModelsCount = 0
    this.modelUnderTraining = 0

    this.selectedPhaseId = phaseId

    let tempData = []
    this.submissionChallengeDetails.map( dt => {
      if (dt.phaseId == this.selectedPhaseId) {
        tempData.push(dt)
      }
    })
    this.selectedPhase = tempData
    this.trainingModels()
  }

  trainingModels() {
    this.submissionChallengeDetails.find(dt => {
      this.selectedPhase.map(res => {
        if (dt.phaseId == res.phaseId) {
          this.modelUnderTraining += 1
        }
      })
    })
    this.modelPassed()
  }

  modelPassed() {
    this.selectedPhase.find(dt => {
      if (dt.score >= this.challengeDetails.phases[this.phaseNo].passingScore) {
        this.passedModelsCount += 1
      }
    })
  }

  viewModel(id) {
    this.router.navigateByUrl('invmodel-view/' + id)
  }

  exportexcel() {
    let count = this.selectedPhase.length
    if (this.submissionChallengeDetails && this.submissionChallengeDetails.length > 0) {
      let element = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true });
      for (let i = 0; i <= count; i++) {
        let c = i + 1
        delete ws['E' + c]
      }
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'ExcelSheet.xlsx');
    }
  }

  sortSelect(sort) {
    let criteria = sort.item.content;
    if (criteria == 'Model Name') {
      this.selectedPhase.sort((a, b) => {
        if (a.modelName < b.modelName) { return -1; }
        if (a.modelName > b.modelName) { return 1; }
        return 0;
      })
    }
    if (criteria == 'User Invited') {
      this.selectedPhase.sort((a, b) => {
        if (a.innovatorId.fullName < b.innovatorId.fullName) { return -1; }
        if (a.innovatorId.fullName > b.innovatorId.fullName) { return 1; }
        return 0
      })
    }
    if (criteria == 'Model Uploaded') {
      this.selectedPhase.sort((a, b) => {
        return b.createdAt - a.createdAt
      })
    }
    if (criteria == 'Score') {
      this.selectedPhase.sort((a, b) => {
        return b.score - a.score
      })
    }
  }

  data1 = [
		{
			"group": "Train Loss",
			"iterationValue": "250",
			"lossValue": 2,
			"surplus": 1823.656992324374
		},
		{
			"group": "Train Loss",
			"iterationValue": "380",
			"lossValue": 3,
			"surplus": 600510781.1304932
		},
		{
			"group": "Train Loss",
			"iterationValue": "550",
			"lossValue": 4,
			"surplus": 540820524.4244617
		},
		{
			"group": "Train Loss",
			"iterationValue": "590",
			"lossValue": 5.5,
			"surplus": 815336175.5584991
		},
		{
			"group": "Train Loss",
			"iterationValue": "640",
			"lossValue": 5,
			"surplus": 430635742.9919021
		}
	];
	options1 = {
		"title": "Model Submissions Over Time",
		"color": {
			"pairing": {
				"option": 2
			},
			"scale": {
				"Qty": "#925699",
				"Misc": "#525669"
			}
		},
		grid: { x: { enabled: false } },
		"axes": {
			"bottom": {
				// "title": "Iteration",
				"mapsTo": "iterationValue",
				"scaleType": "linear"
			},
			"left": {
				// "title": "Loss",
				"mapsTo": "lossValue",
				"scaleType": "linear"
			}
		},
		"curve": "curveMonotoneX",
		"height": "400px",

		getFillColor: (group: String) => {
			if (group == 'Train Loss') {
				return 'green';
			}
		},
		getStrokeColor: (group: String) => {
			if (group == 'Train Loss') {
				return 'green';
			}
		}
	};

}