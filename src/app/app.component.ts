import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emailservice';

  SIGNED_IN_$: BehaviorSubject<boolean>

  constructor(private authService: AuthService) {
    this.SIGNED_IN_$ = this.authService.SIGNED_IN_$
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(() => { })
  }
}
