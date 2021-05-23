import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RequestService {
   baseUrl : string = "http://localhost:3000/api/";
  // baseUrl: string = "https://meanapp01.herokuapp.com/api/";
  //baseUrl : string = "http://c3d63729279b.ngrok.io";
  constructor(private http:HttpClient) { }

  get(uri, params): Observable<any> {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    return this.http.get(this.baseUrl + uri, {
      headers: {
        token: userDetails.access_token
      },
      params: params
    })
  }

  signing(uri,payload): Observable<any> {
    // const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    return this.http.post(this.baseUrl + uri, payload, {
      // headers: {
      //   token: userDetails.access_token
      // }
    });
  }

  post(uri,payload): Observable<any> {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    return this.http.post(this.baseUrl + uri, payload, {
      headers: {
        token: userDetails.access_token
      }
    });
  }

  put(uri,payload): Observable<any> {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    return this.http.put(this.baseUrl + uri, payload, {
      headers: {
        token: userDetails.access_token
      }
    });


  }


}
