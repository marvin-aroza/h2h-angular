import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders} from '@angular/common/http';

import { environment } from 'src/environments/environment'

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private httpclient:HttpClient) { }

  getNewsletterList(){
    let headers = this.getheaders();
    return this.httpclient.get<any>(`${environment.apiUrl}newsletter`,
      {headers:headers}
    ).pipe(map((result:any)=> {
      //console.log({result})
      return result;
    }))
  }

  getNewsletter(newsletterId:any){
    let headers = this.getheaders();
    return this.httpclient.get<any>(`${environment.apiUrl}newsletter/${newsletterId}`,
      {headers:headers}
    ).pipe(map((result:any)=> {
      return result;
    }))
  }

  deleteNewsletter(newsletterId:any){
    let headers = this.getheaders();
    return this.httpclient.delete<any>(`${environment.apiUrl}newsletter/${newsletterId}`,
      {headers:headers}
    ).pipe(map((result:any)=> {
      return result;
    }))
  }

  addNewsletter(formData:any){
    console.log(formData);
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.httpclient.post<any>(`${environment.apiUrl}newsletter`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }


  updateNewsletter(formData:any, newsletterId:any){
    console.log(formData);
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.httpclient.patch<any>(`${environment.apiUrl}newsletter/${newsletterId}`, formData, {
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

  getNewCount(){
    let headers = this.getheaders();
    return this.httpclient.get<any>(`${environment.apiUrl}newsletter/total/count`,
      {headers:headers}
    ).pipe(map((result:any)=> {
      return result;
    }))
  }

  sendNewsletter(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.httpclient.post<any>(`${environment.apiUrl}newsletter/send-newsletter/${id}`, {}, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }
}
