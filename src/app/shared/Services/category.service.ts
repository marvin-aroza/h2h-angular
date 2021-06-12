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
export class CategoryService {

  constructor(
    private http:HttpClient
  ) { }

  //get category list
  getCategory() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}master/category`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  //add category
  addCategory(formData:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.post<any>(`${environment.apiUrl}master/category`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  //get category by id
  getCategroyById(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}master/category/${id}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  //update the category
  updateCategory(formData:any, id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.patch<any>(`${environment.apiUrl}master/category/${id}`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  //delete category
  deleteCategory(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.delete<any>(`${environment.apiUrl}master/category/${id}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }
}
