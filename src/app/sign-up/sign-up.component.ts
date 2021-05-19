import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    // confirmPassword: String,
    role: String,
    bio: String,
    experience: String
  }

  ngOnInit() {
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
      this.requestService.signing('auth/signup', this.signupDetails).subscribe( data => {
        this.router.navigateByUrl('login')
      })
    } else {
      //toaster display
    }
  }

  login() {
    this.router.navigateByUrl('login')
  }

}
