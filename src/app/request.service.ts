import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl : string = "http://localhost:3000/";
  // baseUrl: string = "https://meanapp01.herokuapp.com";
  constructor(private http:HttpClient) { }

  get(uri): Observable<any> {
    return this.http.get(this.baseUrl + uri)

  }

  post(uri,payload): Observable<any> {
    //return this.http.get(this.baseURL + uri)
    return this.http.post(this.baseUrl + uri, payload);


  }
}
