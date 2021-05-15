import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private router: Router
  ) { }
  username: String;
  password: String;

  ngOnInit() {
    this.username= '';
    this.password= '';
  }

  login() {
    let loginData = {
      username : this.username,
      password : this.password
    }
    
    this.requestService.signing('auth/login', loginData).subscribe( data => {
      const userDetails = data.userDetails;
      localStorage.setItem('userDetails', JSON.stringify(userDetails))

      if (userDetails.role == 'Insurer') {        
        this.router.navigateByUrl('/')
      } else if (userDetails.role == 'Innovator') {
        this.router.navigateByUrl('invchallenges')
      }
    })

  }



}
