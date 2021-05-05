import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-challange-tile',
  templateUrl: './challange-tile.component.html',
  styleUrls: ['./challange-tile.component.scss']
})
export class ChallangeTileComponent implements OnInit {

  @Input() challange: any;
  constructor() { }

  ngOnInit() {
    console.log("challange ..... ", this.challange)
    this.challange = [
      {
          "_id": "607fc91684c1073a1dfa2426",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Simplifying the applicaiton process",
          "description": "Develop a predictive model that accurately classifies risk using a more automated approch in order to speed up the application process for new customers",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fc91684c1073a1dfa2427",
                  "_id": "607fc91684c1073a1dfa2428",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn "
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fc9d784c1073a1dfa242b",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Simplifying the applicaiton process -2 ",
          "description": "Develop a predictive model that accurately classifies risk using a more automated approch in order to speed up the application process for new customers--2",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fc91684c1073a1dfa2427",
                  "_id": "607fc91684c1073a1dfa2428",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn "
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fc9e184c1073a1dfa242e",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Simplifying the applicaiton process -3 ",
          "description": "Develop a predictive model that accurately classifies risk using a more automated approch in order to speed up the application process for new customers--3",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fc91684c1073a1dfa2427",
                  "_id": "607fc91684c1073a1dfa2428",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn "
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fc9e584c1073a1dfa2431",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Simplifying the applicaiton process -4 ",
          "description": "Develop a predictive model that accurately classifies risk using a more automated approch in order to speed up the application process for new customers--4",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fc91684c1073a1dfa2427",
                  "_id": "607fc91684c1073a1dfa2428",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn "
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fc9eb84c1073a1dfa2434",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Test challenge 5",
          "description": "Test challenge description...",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fc9eb84c1073a1dfa2435",
                  "_id": "607fc9eb84c1073a1dfa2436",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn"
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fca1784c1073a1dfa243c",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Test challenge 6",
          "description": "Test challenge description...",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fca1784c1073a1dfa243d",
                  "_id": "607fca1784c1073a1dfa243e",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn"
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fca1b84c1073a1dfa243f",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Test challenge 7",
          "description": "Test challenge description...",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "OTHER",
          "phases": [
              {
                  "phaseId": "607fcbc784c1073a1dfa24e0",
                  "_id": "607fcbc784c1073a1dfa24e1",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn"
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "STARTUP",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fca5684c1073a1dfa2449",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Test challenge 8",
          "description": "Test challenge description...",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fca5684c1073a1dfa244a",
                  "_id": "607fca5684c1073a1dfa244b",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn"
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fca6084c1073a1dfa244c",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Test challenge 9",
          "description": "Test challenge description...",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fca6084c1073a1dfa244d",
                  "_id": "607fca6084c1073a1dfa244e",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn"
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fca6584c1073a1dfa244f",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Test challenge 10",
          "description": "Test challenge description...",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "ONE OFF",
          "phases": [
              {
                  "phaseId": "607fcbf884c1073a1dfa24f1",
                  "_id": "607fcbf884c1073a1dfa24f2",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn"
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "BIG_FIRM",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fca6984c1073a1dfa2452",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Test challenge 11",
          "description": "Test challenge description...",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fca6984c1073a1dfa2453",
                  "_id": "607fca6984c1073a1dfa2454",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn"
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fca6d84c1073a1dfa2455",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Test challenge 12",
          "description": "Test challenge description...",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fca6d84c1073a1dfa2456",
                  "_id": "607fca6d84c1073a1dfa2457",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn"
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fca7184c1073a1dfa2458",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Test challenge 13",
          "description": "Test challenge description...",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fca7184c1073a1dfa2459",
                  "_id": "607fca7184c1073a1dfa245a",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn"
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fca7484c1073a1dfa245b",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Test challenge 14",
          "description": "Test challenge description...",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fca7484c1073a1dfa245c",
                  "_id": "607fca7484c1073a1dfa245d",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn"
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      },
      {
          "_id": "607fca7b84c1073a1dfa245e",
          "createdAt": "1618987221694",
          "updatedAt": null,
          "updatedBy": null,
          "title": "Test challenge 15",
          "description": "Test challenge description...",
          "Objective": "Test challenge objective",
          "expiryDate": "2021-04-13T06:48:27.208Z",
          "visulizationImageFilePath": [
              "https://google.com"
          ],
          "sampleDataFilePath": [
              "http://localpath.com"
          ],
          "submissionsCount": 10,
          "acceptedUsersCount": 5,
          "challengeType": "CONTRACT",
          "phases": [
              {
                  "phaseId": "607fca7b84c1073a1dfa245f",
                  "_id": "607fca7b84c1073a1dfa2460",
                  "description": "Phase description",
                  "usageGuidance": "23",
                  "minimumModelScore": "896798hn"
              }
          ],
          "visibiltiy": {
              "minPointEarned": 10,
              "maxPointEarned": 12,
              "minChallenge": 2,
              "maxChallenge": 4,
              "isActive": true,
              "awarededTo": "60767631222df1253206ff74",
              "accountType": "INDEPENDENT",
              "programmingLanguage": "PYTHON",
              "confirmationDate": "2021-04-14T05:41:44.652Z",
              "completedAt": "2021-04-14T05:41:44.652Z"
          },
          "insurerId": "6076c19aad0c92991a8ba0bf",
          "isActive": true
      }
  ]
  }

  getDate(time) {
    time = parseInt(time);
    let dt = new Date(time);
    return dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
  }
}
