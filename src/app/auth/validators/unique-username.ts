import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl } from "@angular/forms";
import { map, catchError, of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: 'root'
})

export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) { }

    validate = (control: FormControl) => {
        const { value } = control
        return this.authService.usernameAvailable(value)
            .pipe(
                map(value => {
                    console.log('Username is Available')
                    return null
                })
                ,
                catchError(err => {
                    if (err.error.username) {
                        console.log('Username is not available')
                        return of({ UsernameAvailable: false })
                    } else {
                        console.log('Connection Lost')
                        return of({ ConnectionError: true })

                    }
                })
            )
    }
}
