import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface SignupResponse {
  username: string
}

interface SignedinResponse {
  authenticated: boolean,
  username: string
}
interface SigninCredentials {
  username: string,
  password: string
}
interface signinResponse{
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'https://api.angular-email.com'
  SIGNED_IN_$ = new BehaviorSubject(null)
  username = ''

  constructor(private http: HttpClient) { }


  // check if username is available
  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(this.URL + '/auth/username', {
      username
    })
  }

  // check if the form is valid and return the response
  signup(credentials: any) {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };
    const body = JSON.stringify(credentials);
    return this.http.post<SignupResponse>(this.URL + '/auth/signup', body, options,)
      .pipe(
        tap(({username}) => {
          this.SIGNED_IN_$.next(true)
          this.username = username
        })
      )
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(this.URL + '/auth/signedin', {
      withCredentials: true
    }).pipe(
      tap(({ authenticated, username }) => {
        this.SIGNED_IN_$.next(authenticated)
        this.username = username
      })
    )
  }

  signout() {
    return this.http.post(this.URL + '/auth/signout', {})
      .pipe(
        tap(() => {
          this.SIGNED_IN_$.next(false)
        })
      )
  }
  signin(credentials: SigninCredentials) {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    const body = JSON.stringify(credentials);
    return this.http.post<signinResponse>(this.URL + '/auth/signin',body, options)
      .pipe(
        tap(({username}) => {
          this.SIGNED_IN_$.next(true)
          this.username = username
        })
      )
  }

}
