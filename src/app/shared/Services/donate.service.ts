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
}
