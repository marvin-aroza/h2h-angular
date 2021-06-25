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
export class ContactService {

  constructor(
    private http:HttpClient
  ) { }

  //get contact count
  getContactCount() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}contact/count`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  //get contact List
  getContactList() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}contact`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  //get contact details by id
  getContactDetail(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}contact/${id}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  //get contact notification read by id
  getContactMarkRead(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.patch<any>(`${environment.apiUrl}contact/${id}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  // contact reply
  reply(id:any, formData:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.patch<any>(`${environment.apiUrl}contact/reply/${id}`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  //get contact notification delete by id
  getContactDelete(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.delete<any>(`${environment.apiUrl}contact/${id}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }
}
