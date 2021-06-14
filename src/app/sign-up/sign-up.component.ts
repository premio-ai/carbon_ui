import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGES } from '../../config/config';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private router: Router
  ) { }
  registerAs: any;
  signupDetails: {
    fullName: String,
    email: String,
    password: String,
    role: String,
    bio: String,
    experience: String
  }
  toasterMsg: boolean
  fullNameError: boolean
  emailError: boolean
  passwordError: boolean
  roleError: boolean
  bioError: boolean
  experienceError: boolean


  ngOnInit() {
    this.toasterMsg = false;

    this.registerAs = [
      { content: 'Insurer' },
      { content: 'Innovator' }
    ];

    this.signupDetails = {
      fullName: '',
      email: '',
      password: '',
      // confirmPassword: '',
      role: '',
      bio: '',
      experience: ''
    }
  }

  selected(role) {
    this.signupDetails.role = role.item.content;
  }

  signUp() {
    if (this.signupDetails.fullName && this.signupDetails.email && this.signupDetails.password && this.signupDetails.role && this.signupDetails.experience && this.signupDetails.bio) {
      this.requestService.signing('auth/signup', this.signupDetails).toPromise().then( data => {
        if (data.result == MESSAGES.REG_SUCCESS) {
          this.router.navigateByUrl('login')
        }
      })
    }
  }

  validate() {
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isAlphaNum = /^[a-z0-9]+$/i
    if (this.signupDetails.fullName.length > 3 && this.signupDetails.email.match(emailReg) && this.signupDetails.password.length > 0
      && this.signupDetails.role.length>0 && this.signupDetails.bio.length>0 && this.signupDetails.experience.length>0) {
        this.signUp();
    } else {
      if (this.signupDetails.fullName.length > 3 && this.signupDetails.fullName.match(isAlphaNum)) {
        this.fullNameError = false
      } else {
        this.fullNameError = true
      }
      if (!this.signupDetails.email.match(emailReg) || this.signupDetails.email.length == 0) {
        this.emailError = true
      } else {
        this.emailError = false
      }
      if (this.signupDetails.password.length > 0) {
        this.passwordError = false
      } else {
        this.passwordError = true
      }
      if (this.signupDetails.role.length > 0) {
        this.roleError = false
      } else {
        this.roleError = true
      }
      if (this.signupDetails.bio.length > 0) {
        this.bioError = false
      } else {
        this.bioError = true
      }
      if (this.signupDetails.experience.length > 0) {
        this.experienceError = false
      } else {
        this.experienceError = true
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

  login() {
    this.router.navigateByUrl('login')
  }

}
