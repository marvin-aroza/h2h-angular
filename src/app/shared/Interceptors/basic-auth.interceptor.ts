import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

//Services
import { AuthService} from 'src/app/shared/Services/auth.service'

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.authService.getUserDetails();
console.log(currentUser);
    //If the user details are present then this line will add the authorization token to every api call
    if (currentUser && currentUser.token) {
      console.log(currentUser);

      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${currentUser.token}`,
              Accept: 'application/json',
             'Content-type': 'application/json'
          }
      });
    }
    return next.handle(request);

  }
}
