import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';

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

      this.requestService.signing('auth/login', loginData).subscribe(data => {
        const userDetails = data.userDetails;
        localStorage.setItem('userDetails', JSON.stringify(userDetails))

        if (userDetails.role == 'Insurer') {
          this.router.navigateByUrl('dashboard')
        } else if (userDetails.role == 'Innovator') {
          this.router.navigateByUrl('invdash')
        }
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

  showToaster = (() => {
    this.toasterMsg = true
    setTimeout(() => {
      this.toasterMsg = false
    }, 3000)
  })

  closeToaster() {
    this.toasterMsg = false
  }

  signUp() {
    this.router.navigateByUrl('signup')
  }

}
