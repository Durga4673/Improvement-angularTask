import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       // If users are not enter login details it will stop the routings and inject the auth service into the authgaurd
//       if(inject(AuthService).session)return true;
//       inject(Router).navigateByUrl('/');
//       return false;
//   }
// }

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Check if the user is logged in by using the AuthService
    if (this.authService.session) {
      return true;
    }
    // If the user is not logged in, redirect them to the login page or any other page of your choice
    return this.router.parseUrl('/Login');
  }
}
