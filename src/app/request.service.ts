import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseURL : string = "http://localhost:3000/";
  constructor(private http:HttpClient) { }

  get(uri): Observable<any> {
    return this.http.get(this.baseURL + uri)

  }
}
