import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders} from '@angular/common/http';

import { environment } from 'src/environments/environment'

import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private httpclient:HttpClient) { }

  getPostList(filter:any = null){
    let headers = this.getheaders();
    //headers.append('Authorization',json)
    return this.httpclient.get<any>(`${environment.apiUrl}post/all-list?filter=${filter}`,
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

  getPostById(id:any){
    let headers = this.getheaders();

    return this.httpclient.get<any>(`${environment.apiUrl}post/`+id,{
      headers:headers
    }).pipe(map((result:any)=>{
      return result;
    }))
  }

  updatePostStatus(postId:any,status:any){
    let headers = this.getheaders();

    return this.httpclient.patch<any>(`${environment.apiUrl}post/status-update/`+postId+`/`+status,
    {headers:headers}).pipe(map((result:any)=>{
      return result;
    }))
  }

  addCommentOnPost(postId:any,formdata:any){
    let headers = this.getheaders();

    return this.httpclient.patch<any>(`${environment.apiUrl}post/add-comments/`+postId,
    {headers:headers}).pipe(map((result:any)=>{
      return result;
    }))
  }

  getheaders(){
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    headers.append('Accept','application/json');
    return headers;
  }

  getPostCount(){
    let headers = this.getheaders();
    return this.httpclient.get<any>(`${environment.apiUrl}post/total/count`,
      {headers:headers}
    ).pipe(map((result:any)=> {
      return result;
    }))
  }
}
