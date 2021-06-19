import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders} from '@angular/common/http';

import { environment } from 'src/environments/environment'

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpclient:HttpClient) { }

  getEventList(filter:any = undefined){
    let headers = this.getheaders();
    return this.httpclient.get<any>(`${environment.apiUrl}event?filter=${filter}`,
      {headers:headers}
    ).pipe(map((result:any)=> {
      return result;
    }))
  }

  getEvent(eventId:any){
    let headers = this.getheaders();
    return this.httpclient.get<any>(`${environment.apiUrl}event/${eventId}`,
      {headers:headers}
    ).pipe(map((result:any)=> {
      return result;
    }))
  }

  deleteEvent(eventId:any){
    let headers = this.getheaders();
    return this.httpclient.delete<any>(`${environment.apiUrl}event/${eventId}`,
      {headers:headers}
    ).pipe(map((result:any)=> {
      return result;
    }))
  }

  addEvents(formData:any){
    console.log(formData);
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.httpclient.post<any>(`${environment.apiUrl}event`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }


  updateEvent(formData:any, eventId:any){
    console.log(formData);
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.httpclient.patch<any>(`${environment.apiUrl}event/${eventId}`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  markEventCompleted(eventId:any){
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.httpclient.patch<any>(`${environment.apiUrl}event/status-update/${eventId}`, {}, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  getheaders(){
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    headers.append('Accept','application/json');
    return headers;
  }

  getEventCount(){
    let headers = this.getheaders();
    return this.httpclient.get<any>(`${environment.apiUrl}event/total/count`,
      {headers:headers}
    ).pipe(map((result:any)=> {
      return result;
    }))
  }
}
