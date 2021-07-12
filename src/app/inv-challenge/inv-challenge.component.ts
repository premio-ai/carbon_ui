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
  pageOffsetBM: number;
  totalPageBM: number;
  pageNoBM: number;
  isApiLoading: boolean;
  loadIndex: number;
  errorToasterMsg: boolean;

  ngOnInit() {
    this.pageNo = 1;
    this.pageOffset = 0;
    this.totalPage = 1;
    this.pageNoBM = 1;
    this.pageOffsetBM = 0;
    this.totalPageBM = 1;
    this.loadIndex = -1;
    this.errorToasterMsg = false;

    let userDetails = JSON.parse(localStorage.getItem('userDetails'))
    if (userDetails && userDetails._id) {
      this.getAllActiveChallanges(this.pageOffset);
      this.getBookmarkedChallenges(this.pageOffsetBM, null);
    } else {
      this.router.navigateByUrl('')
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

    this.requestService.get(allActiveChallanegUrl, params).toPromise().then(data => {
      this.totalPage = Math.ceil(data.count / 10);
      this.activeChallenges = data.list;
    }).catch(err => { })
  }

  isBookmarked(challengeId) {    
    if (this.bookmarkedChallenges.length > 0) {
      let result = this.bookmarkedChallenges.some(dt => {
        if (dt && dt._id == challengeId) {
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
      this.pageOffset = (this.pageNo-1) * 10;
      this.getAllActiveChallanges(this.pageOffset)
    }
  }

  nextPage() {
    if (this.pageNo < (this.totalPage)) {
      this.pageNo++;
      this.pageOffset = (this.pageNo-1) * 10;
      this.getAllActiveChallanges(this.pageOffset)
    }
  }

  prevPageBM() {
    if (this.pageNoBM > 1) {
      this.pageNoBM--;
      this.pageOffsetBM = (this.pageNoBM-1) * 10;
      this.getBookmarkedChallenges(this.pageOffsetBM, null)
    }
  }

  nextPageBM() {
    if (this.pageNoBM < (this.totalPage)) {
      this.pageNoBM++;
      this.pageOffsetBM = (this.pageNoBM-1) * 10;
      this.getBookmarkedChallenges(this.pageOffsetBM, null)
    }
  }

  getBookmarkedChallenges(pageOffsetBM, index) {
    this.loadIndex = index
    let url = "bookmarkChallenge/getBookMarkChallengeBrowse";
    let params = {
      skip: pageOffsetBM
    }
    this.requestService.get(url, params).toPromise().then(data => {
      this.loadIndex = -1;
      this.totalPageBM = Math.ceil(data.count / 10);
      this.bookmarkedChallenges = data.list;
    }).catch(err => {
      this.errorToaster();
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

  viewChallenge(challengeId) {
    this.router.navigateByUrl('invaccepted/' + challengeId)
  }

  bookmarkChallenge(challengeId, index) {
    this.isApiLoading = true;
    this.loadIndex = index
    let url = 'bookmarkChallenge'
    let data = {
      challengeId: challengeId
    }
    this.requestService.post(url, data).toPromise().then(data => {
      this.isApiLoading = true;
      this.loadIndex = -1;
      this.getBookmarkedChallenges(this.pageOffsetBM, index);
    }).catch(err => {
      this.errorToaster();
    })
  }

  unBookmarkChallenge(challengeId, index) {
    this.isApiLoading = true;
    this.loadIndex = index
    let url = 'bookmarkChallenge'
    let data = {
      challengeId: challengeId
    }
    this.requestService.put(url, data).toPromise().then(data => {
      this.isApiLoading = true;
      this.loadIndex = -1;
      this.getBookmarkedChallenges(this.pageOffsetBM, index);
    }).catch(err => {
      this.errorToaster();
    })
  }

  checkLoading(i) {
    if (this.loadIndex == i) {
      return true
    } else {
      return false
    }
  }

}