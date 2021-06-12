import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/shared/Services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public router: Router, private authservice:AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Localstorage check
      let usertoken = this.authservice.getUserDetails();

      //let userCheck = false; //Check the token details here from localStorage... return false if not present if present return true
      if(Object.keys(usertoken).length > 0) {

        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

}
