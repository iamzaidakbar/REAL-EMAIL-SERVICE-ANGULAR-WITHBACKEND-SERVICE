import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.SIGNED_IN_$.pipe(
      skipWhile( value => value === null),
      take(1),
      tap( (authenticated) => {
        if(!authenticated){
          console.log('USER NOT AUTHENTICATED !!');
          
          this.router.navigateByUrl('/')
        }
      })
    )
  }
}
