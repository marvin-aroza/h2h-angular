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
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  //get user list
  getUsers(filter:any = null) {
    let headers: HttpHeaders = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}user?filter=${filter}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  //add user
  addAdmin(formData:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.post<any>(`${environment.apiUrl}auth/register`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  //get user by id
  getAdminById(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}user/${id}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  //updae the user
  updateAdmin(formData:any, id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.patch<any>(`${environment.apiUrl}user/${id}`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  //delete user
  deleteAdmin(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.delete<any>(`${environment.apiUrl}user/${id}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  //Mark  user status user
  markStatusAdmin(id:any, formData:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.patch<any>(`${environment.apiUrl}user/mark-status/${id}`, formData,{
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  //update profile image
  updateProfileImage(id:any, formData:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.patch<any>(`${environment.apiUrl}user/profile-upload/${id}`, formData,{
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }
}
