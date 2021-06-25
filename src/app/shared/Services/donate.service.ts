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
export class DonateService {

  constructor(
    private http:HttpClient
  ) { }

  //get Donation request List
  getDonationRequestList() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}donate/donate-request/list`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  //get Donation request List
  getDonationRequest(requestId:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}donate/donate-request/single/${requestId}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  //get Donation request confirm
  confirmDonation(requestId:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}donate/donate-request/confirm/${requestId}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  //get the total count
  getDonationDetailscount() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}donate/donation/count`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result;
    }));
  }

  //Generic function to get donate list by category
  getDonateList(catId:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}donate/admin-list/with-filter/listing/${catId}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  getDonatebyId(donateId:any) {
    console.log(donateId);
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}donate/detail/${donateId}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  updateDonationStatus(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.patch<any>(`${environment.apiUrl}donate/update-status/${id}`, {}, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }
}
