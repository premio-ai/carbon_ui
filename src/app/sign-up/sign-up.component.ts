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
    experience: number
  }
  showToasterMsg: boolean
  showSuccessToasterMsg: boolean
  toasterMsg: String
  fullNameError: boolean
  emailError: boolean
  passwordError: boolean
  roleError: boolean
  bioError: boolean
  experienceError: boolean
  isApiLoading: boolean


  ngOnInit() {
    this.showToasterMsg = false;
    this.isApiLoading = false;

    this.registerAs = [
      { content: 'Insurer' },
      { content: 'Innovator' }
    ];

    this.signupDetails = {
      fullName: '',
      email: '',
      password: '',
      role: '',
      bio: '',
      experience: 0
    }
  }

  selected(role) {
    this.signupDetails.role = role.item.content;
  }

  signUp() {
    this.isApiLoading = true;
    this.signupDetails.fullName=this.signupDetails.fullName.trim()
    if (this.signupDetails.fullName && this.signupDetails.email && this.signupDetails.password && this.signupDetails.role && this.signupDetails.experience && this.signupDetails.bio) {
      this.requestService.signing('auth/signup', this.signupDetails).toPromise().then( data => {
        this.isApiLoading = false
        if (data.result == MESSAGES.REG_SUCCESS) {
          this.toasterMsg = MESSAGES.SUCCESSFUL_REGISTRATION
          this.showSuccessToaster();
        } else if (data.result == MESSAGES.USER_REGISTERED) {
          this.toasterMsg = MESSAGES.EMAIL_REG
          this.showToaster()
        }
      }).catch( err => {
        this.isApiLoading = false
        this.toasterMsg = MESSAGES.WRONG
        this.showToaster()
      })
    }
  }

  validate() {
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isAlphaNum = /^[a-zA-Z ]+$/
    this.signupDetails.fullName=this.signupDetails.fullName.trim()
    if (this.signupDetails.fullName.length > 2 && this.signupDetails.fullName.match(isAlphaNum) && this.signupDetails.email.match(emailReg) && this.signupDetails.password.length > 0
      && this.signupDetails.role.length>0 && this.signupDetails.bio.length>0 && this.signupDetails.experience>=0) {
        this.fullNameError = false;
        this.emailError = false;
        this.passwordError = false;
        this.roleError = false;
        this.bioError = false;
        this.experienceError = false;
        this.signUp();
    } else {
      if (this.signupDetails.fullName.length > 2 && this.signupDetails.fullName.match(isAlphaNum)) {
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
      if (this.signupDetails.experience>=0) {
        this.experienceError = false
      } else {
        this.experienceError = true
      }
    }
  }

  showSuccessToaster = (() => {
		this.showSuccessToasterMsg = true
		setTimeout(() => {
      this.router.navigateByUrl('login')
      this.showToasterMsg = false;
		}, 3000)
	})

  showToaster = (() => {
		this.showToasterMsg = true
		setTimeout(() => {
			this.showToasterMsg = false
		}, 3000)
	})

	closeToaster() {
		this.showToasterMsg = false
	}

  login() {
    this.router.navigateByUrl('login')
  }

}
