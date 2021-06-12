import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders} from '@angular/common/http';

import { environment } from 'src/environments/environment'

import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private httpclient:HttpClient) { }

  getPostList(){
    let headers = this.getheaders();
    //headers.append('Authorization',json)
    return this.httpclient.get<any>(`${environment.apiUrl}post`,
      {headers:headers}
    ).pipe(map((result:any)=> {
      //console.log({result})
      return result;
    }))
  }

  addPost(formdata:any){
    let headers = this.getheaders();
    console.log({formdata});
    return this.httpclient.post<any>(`${environment.apiUrl}post`,formdata,{
      headers:headers
    }).pipe(map((result:any)=>{

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
