import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThisSideUpDirective } from '@carbon/icons-angular';
import * as moment from 'moment';
import { RequestService } from "../request.service";

@Component({
  selector: 'app-inv-challenge',
  templateUrl: './inv-challenge.component.html',
  styleUrls: ['./inv-challenge.component.scss']
})

export class InvChallengeComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private router: Router
  ) { }
  sorting: any[]
  activeChallenges: any[];
  bookmarkedChallenges: any[] = [];
  innovatorId = "607e856d2d00fd7ed549689e";
  pageOffset: number;
  totalPage: number;
  pageNo: number;

  ngOnInit() {
    this.pageNo = 0;
    this.pageOffset = 0;
    this.totalPage = 0;

    let userDetails = JSON.parse(localStorage.getItem('userDetails'))
    if (userDetails && userDetails._id) {
      this.getAllActiveChallanges(this.pageOffset);
      // this.getBookmarkedChallenges();
    } else {
      this.router.navigateByUrl('login')
    }

    this.sorting = [
      { content: 'Most Popular' },
      { content: 'Least Popular' },
      { content: 'Newest' },
      { content: 'Oldest' },
      { content: 'End Date' }
    ];

  }

  sortSelect(sort) {
    let criteria = sort.item.content;

    if (criteria == 'Newest') {
      this.activeChallenges.sort((a, b) => {
        return b.createdAt - a.createdAt
      })
      this.bookmarkedChallenges.sort((a, b) => {
        return b.createdAt - a.createdAt
      })
    }

    if (criteria == 'Oldest') {
      this.activeChallenges.sort((a, b) => {
        return a.createdAt - b.createdAt
      })
      this.bookmarkedChallenges.sort((a, b) => {
        return a.createdAt - b.createdAt
      })
    }

    if (criteria == 'End Date') {
      this.activeChallenges.sort((a, b) => {
        return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
      })
      this.bookmarkedChallenges.sort((a, b) => {
        return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
      })
    }

    if (criteria == 'Most Popular') {
      this.activeChallenges.sort((a, b) => {
        return b.acceptedUsersCount - a.acceptedUsersCount
      })
      this.bookmarkedChallenges.sort((a, b) => {
        return b.acceptedUsersCount - a.acceptedUsersCount
      })
    }

    if (criteria == 'Least Popular') {
      this.activeChallenges.sort((a, b) => {
        return a.acceptedUsersCount - b.acceptedUsersCount
      })
      this.bookmarkedChallenges.sort((a, b) => {
        return a.acceptedUsersCount - b.acceptedUsersCount
      })
    }

  }

  getDate(timeStamp) {
    let date = moment(moment(+timeStamp)).format("DD/MM/YYYY")
    return date;
  }

  getExpiryDate(dt) {
    let date = moment(dt).format('DD/MM/YYYY')
    return date;
  }

  getAllActiveChallanges(pageOffset) {
    let allActiveChallanegUrl = "challenge/all";
    let params = {
      skip: pageOffset
    }

    this.requestService.get(allActiveChallanegUrl, params).subscribe(data => {
      this.totalPage = Math.ceil(data.count / 10);
      this.activeChallenges = data.list;
      this.getBookmarkedChallenges();
    })
  }

  isBookmarked(challengeId) {
    if (this.bookmarkedChallenges.length > 0) {
      let result = this.bookmarkedChallenges.some(dt => {
        if (dt._id == challengeId) {
          return true;
        } else {
          return false;
        }
      })
      return result;
    } else {
      return false;
    }
  }

  prevPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.pageOffset = this.pageNo * 10;
      this.getAllActiveChallanges(this.pageOffset)
    }
  }

  nextPage() {
    if (this.pageNo < (this.totalPage - 1)) {
      this.pageNo++;
      this.pageOffset = this.pageNo * 10;
      this.getAllActiveChallanges(this.pageOffset)
    }
  }

  getBookmarkedChallenges() {
    let url = "bookmarkChallenge";
    this.requestService.get(url, null).subscribe(data => {

      let tempData = []
      this.activeChallenges.filter(dt => {
        data.map(res => {
          if (dt._id == res.challengeId) {
            tempData.push(dt)
          }
        })
      })
      this.bookmarkedChallenges = tempData;
    })
  }

  viewChallenge(challengeId) {
    this.router.navigateByUrl('invaccepted/' + challengeId)
  }

  bookmarkChallenge(challengeId) {
    let url = 'bookmarkChallenge'
    let data = {
      challengeId: challengeId
    }
    this.requestService.post(url, data).subscribe(data => {
      this.getBookmarkedChallenges()
    })
  }

  unBookmarkChallenge(challengeId) {

    let url = 'bookmarkChallenge'
    let data = {
      challengeId: challengeId
    }
    this.requestService.put(url, data).subscribe(data => {
      this.getBookmarkedChallenges()
    })
  }

}