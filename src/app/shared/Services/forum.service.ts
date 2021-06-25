import { Injectable } from '@angular/core';

//necessary modules
import { HttpClient, HttpHeaders} from '@angular/common/http'

//Environment
import { environment} from 'src/environments/environment'

//rxjs library functions
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(
    private http: HttpClient
  ) { }

  //Generic function to get forum list by category
  getForumList(catId:any = '') {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}forum/admin-list/${catId}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  updateForumStatus(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.patch<any>(`${environment.apiUrl}forum/update-status/${id}`, {}, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  getForumbyId(forumId:any) {
    console.log(forumId);
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}forum/detail/${forumId}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }
}
