import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Console } from 'console';
import { ROLE } from '../../config/config';
import { RequestService } from '../request.service';
//import { Console } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  language: any[];
  constructor(
    private requestService: RequestService,
    private router: Router
  ) { }
  username: String;
  password: String;
  toasterMsg: boolean;
  emailError: boolean;
  passwordError: boolean;
  loginError: boolean;

  ngOnInit() {
    this.toasterMsg = false;
    this.username = '';
    this.password = '';
  }

  login() {
    if (this.username.length > 0 && this.password.length > 0) {
      let loginData = {
        username: this.username,
        password: this.password
      }

      this.requestService.signing('auth/login', loginData).toPromise().then(data => {
          const userDetails = data.userDetails;
           console.log(userDetails);
          localStorage.setItem('userDetails', JSON.stringify(userDetails))
          if (userDetails.role == ROLE.INSURER) {
            this.router.navigateByUrl('dashboard')
          } else if (userDetails.role == ROLE.INNOVATOR) {
            this.router.navigateByUrl('invdash')
          }
      }).catch( err => {
        this.showErrorToaster();
      })
    } else {
      this.validate()
    }
  }

  validate() {
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (this.username.length > 0 && this.username.match(emailReg) && this.password.length > 0) {
      this.login();
    } else {
      if (!this.username.match(emailReg) || this.username.length == 0) {
        this.emailError = true
      } else {
        this.emailError = false
      }
      if (this.password.length > 0) {
        this.passwordError = false
      } else {
        this.passwordError = true
      }
    }
  }

  showErrorToaster = (() => {
    this.loginError = true;
    setTimeout(() => {
      this.loginError = false
    }, 3000)
  })

  showToaster = (() => {
    this.toasterMsg = true
    setTimeout(() => {
      this.toasterMsg = false
    }, 3000)
  })

  closeToaster() {
    this.toasterMsg = false;
    this.loginError = false;
  }

  signUp() {
    this.router.navigateByUrl('signup')
  }

}
