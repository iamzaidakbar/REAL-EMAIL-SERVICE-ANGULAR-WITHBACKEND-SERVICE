import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Email } from './email';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email>{

  constructor(private emailService: EmailService, private router: Router) { }

 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Email | Observable<Email> | Promise<Email> {
     const { id } = route.params
     return this.emailService.getEmail(id).pipe(
       catchError( () => {
         this.router.navigateByUrl('/inbox/not-found')

         return EMPTY
       })
     )


 }

}
