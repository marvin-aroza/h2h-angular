import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

//Rxjs library functions
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import Swal from 'sweetalert2'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {

      //Handle http errors according to their status codes
      if(err.status === 400) {
        //console.log('error 400')
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 3000
        });
      } else if(err.status === 401) {

      } else if(err.status === 422) {

      } else if(err.status === 500) {

      } else if(err.status === 402) {

      }
      //console.log('outside if')

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
