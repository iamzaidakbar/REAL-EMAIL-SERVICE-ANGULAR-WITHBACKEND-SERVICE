import { Injectable } from "@angular/core";
import { Validator, FormGroup, Form } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
    validate(control: FormGroup) {
        const { password, passwordConfirmation } = control.value
        if (password === passwordConfirmation) {
            console.log("Passwords Matched")
            return null
        } else {
            console.log("Passwords is not Matched")
            return { passwordsDontMatch: true }
        }
    }
}
