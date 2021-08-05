import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  baseUrl: string = "http://localhost:3500/api/";                                          // Local URL
 // baseUrl: string = "https://challengeapp.eu-gb.cf.appdomain.cloud/api/"                     //ChallengeApp IBM
  constructor(private http: HttpClient) {}

  get(uri, params): Observable<any> {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    if (userDetails && userDetails.access_token) {
      let res = this.http.get<any>(this.baseUrl + uri, {
        headers: {
          token: userDetails.access_token
        },
        params: params,
        observe: 'response',
        responseType: 'json'
      }).pipe(map(resp => {
        // let refresh_token = resp.headers.get('refresh-token')
        // if (refresh_token && refresh_token.length>0) {          
        //   let updateUserDetails = userDetails
        //   updateUserDetails.access_token = refresh_token
        //   localStorage.setItem('userDetails', JSON.stringify(updateUserDetails))
        // }
        return resp.body;
      }),
        catchError(error => {
          return throwError(error);
        })
      )

      return res;
    }
  }

  signing(uri, payload): Observable<any> {
    return this.http.post(this.baseUrl + uri, payload);
  }

  post(uri, payload): Observable<any> {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    if (userDetails && userDetails.access_token) {
      let res = this.http.post<any>(this.baseUrl + uri, payload, {
        headers: {
          token: userDetails.access_token
        },
        observe: 'response',
        responseType: 'json'
      }).pipe(map(resp => {
        // let refresh_token = resp.headers.get('refresh-token')
        // if (refresh_token && refresh_token.length>0) {          
        //   let updateUserDetails = userDetails
        //   updateUserDetails.access_token = refresh_token
        //   localStorage.setItem('userDetails', JSON.stringify(updateUserDetails))
        // }
        return resp.body;
      }),
        catchError(error => {
          return throwError(error);
        })
      )

      return res;
    }
  }

  put(uri, payload): Observable<any> {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    if (userDetails && userDetails.access_token) {
      let res = this.http.put(this.baseUrl + uri, payload, {
        headers: {
          token: userDetails.access_token
        },
        observe: 'response',
        responseType: 'json'
      }).pipe(map(resp => {
        // let refresh_token = resp.headers.get('refresh-token')
        // if (refresh_token && refresh_token.length>0) {          
        //   let updateUserDetails = userDetails
        //   updateUserDetails.access_token = refresh_token
        //   localStorage.setItem('userDetails', JSON.stringify(updateUserDetails))
        // }
        return resp.body;
      }),
        catchError(error => {
          return throwError(error);
        })
      )
      return res;
    }
  }

}
