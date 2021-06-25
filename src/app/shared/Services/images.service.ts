import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders} from '@angular/common/http';

import { environment } from 'src/environments/environment'

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private httpclient:HttpClient) { }

  getImageList(filter:any = undefined){
    let headers = this.getheaders();
    return this.httpclient.get<any>(`${environment.apiUrl}image`,
      {headers:headers}
    ).pipe(map((result:any)=> {
      return result;
    }))
  }

  getheaders(){
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    headers.append('Accept','application/json');
    return headers;
  }
}
