import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl : string = "http://localhost:3000/";
  // baseUrl: string = "https://meanapp01.herokuapp.com/";
  constructor(private http:HttpClient) { }

  get(uri): Observable<any> {
    return this.http.get(this.baseUrl + uri, {
      // headers: {
      //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6Imluc3VyZXIwMSIsImVtYWlsIjoiaW5zdXJlcjAxQGVtYWlsLmNvbSIsImV4cGVyaWVuY2UiOjAsInVwZGF0ZWRBdCI6bnVsbCwiX2lkIjoiNjA5ZTAyZWM2NTU3ZDQwNWEwY2ZiMTdiIiwiYmlvIjoidGVzdF9pbnN1cmVyX3VzZXIiLCJwb2ludHMiOjAsInJvbGUiOiJJbnN1cmVyIiwiaWF0IjoxNjIwOTk3MzEzLCJleHAiOjE2MjEwMDA5MTN9.dxnM-IT185UgoCbt_eiAWH5PZ26eDMqdqEq8r-Z16CA"
      // }
    })
  }

  post(uri,payload): Observable<any> {
    //return this.http.get(this.baseURL + uri)
    return this.http.post(this.baseUrl + uri, payload, {
      // headers: {
      //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6Imluc3VyZXIwMSIsImVtYWlsIjoiaW5zdXJlcjAxQGVtYWlsLmNvbSIsImV4cGVyaWVuY2UiOjAsInVwZGF0ZWRBdCI6bnVsbCwiX2lkIjoiNjA5ZTAyZWM2NTU3ZDQwNWEwY2ZiMTdiIiwiYmlvIjoidGVzdF9pbnN1cmVyX3VzZXIiLCJwb2ludHMiOjAsInJvbGUiOiJJbnN1cmVyIiwiaWF0IjoxNjIwOTcyNTI5LCJleHAiOjE2MjA5NzYxMjl9.Cvw2VFVCEPkVpNPsk54b7vv9HNyv9G9SDcovUDnfHr8"
      // }
    });
  }

  put(uri,payload): Observable<any> {
    //return this.http.get(this.baseURL + uri)
    return this.http.put(this.baseUrl + uri, payload, {
      // headers: {
      //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6Imluc3VyZXIwMSIsImVtYWlsIjoiaW5zdXJlcjAxQGVtYWlsLmNvbSIsImV4cGVyaWVuY2UiOjAsInVwZGF0ZWRBdCI6bnVsbCwiX2lkIjoiNjA5ZTAyZWM2NTU3ZDQwNWEwY2ZiMTdiIiwiYmlvIjoidGVzdF9pbnN1cmVyX3VzZXIiLCJwb2ludHMiOjAsInJvbGUiOiJJbnN1cmVyIiwiaWF0IjoxNjIwOTcyNTI5LCJleHAiOjE2MjA5NzYxMjl9.Cvw2VFVCEPkVpNPsk54b7vv9HNyv9G9SDcovUDnfHr8"
      // }
    });


  }


}
