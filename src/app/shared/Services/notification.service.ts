import { Injectable } from '@angular/core';

//Required modules
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http'

//Environment
import { environment} from 'src/environments/environment'

//rxjs library functions
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http:HttpClient
  ) { }

  //get notification count
  getNotificationCount() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}notification/count`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  //get notification List
  getNotificationList() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}notification`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }
}
