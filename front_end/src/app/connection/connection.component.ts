import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent {
  constructor(private auth: AuthService) {}

  signUp = false;

  pseudo = new FormControl()
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmPassword = new FormControl('', [Validators.required]);
  hide = true;

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Vous devez entrez votre mail';
    }

    return this.email.hasError('email') ? 'Votre email n\'est pas valide' : '';
  }

  getPasswordErrorMessage(){
    if(this.password.hasError('required')){
      return "Entrez votre mot de passe"
    }

    return this.password.hasError('minlength') ? "8 caractères minimum" : ""
  }

  getConfirmPasswordErrorMessage(){
    let s = ""
    if(this.confirmPassword.hasError('required')){
      s = "Confirmez votre mot de passe"
    }
    else if(this.password.value != this.confirmPassword.value){
      console.log("gneuh")
      s = "Les mots de passe diffèrent"
    }

    return s;
  }

  setSignUp() {
    this.signUp = !this.signUp;
    this.email.setErrors(null)
    this.password.setErrors(null)
    this.confirmPassword.setErrors(null)
  }

  connect() {
    if(this.signUp){
      if(this.email.valid && this.password.valid && this.confirmPassword.valid && this.pseudo.valid){
        const pass = Md5.hashStr(this.password.value!)
        this.auth.addUser(this.email.value!, pass, this.pseudo.value)
      }
    } else if(this.email.valid && this.password.valid){
      const pass = Md5.hashStr(this.password.value!)
      this.auth.connect(this.email.value!, pass)
    }
  }
}
