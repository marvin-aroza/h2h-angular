import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

//Required modules
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http'

//Environment
import { environment} from 'src/environments/environment'

//rxjs library functions
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

//Models
import { User } from 'src/app/shared/Models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //variables
  public currentUserSubject: BehaviorSubject<User>;

  constructor(
    private http:HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  }

  //Login function
  login(formData:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.post<any>(`${environment.apiUrl}login`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
        this.setUserDetails(result.data)
        localStorage.setItem('currentUser', JSON.stringify(result.data));
        this.currentUserSubject.next(result);
      return result;
    }));
  }

  //Registration function
  registration(formData:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.post<any>(`${environment.apiUrl}/add-link-here`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  //Get LocalStorage user details function
  getUserDetails() {
    //Gets the details of the current logged in user from localStorage
    let userDetails = JSON.parse(localStorage.getItem('userDetails')  || '{}')
    return userDetails;
  }

  setUserDetails(userdata:any){
    let userDetails = localStorage.setItem('userDetails',JSON.stringify(userdata))
  }

  changedUserDetails(userdata:any) {
    localStorage.setItem('currentUser',JSON.stringify(userdata))
    this.currentUserSubject.next(userdata);
  }

  //logout
  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
