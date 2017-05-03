import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
   private router: Router) { }

  ngOnInit() {}

  signUpUser(form: NgForm) {
    let payload = {
      username: form.value.email,
      password: form.value.password
    };
    this.authService.signUpBasic(payload).subscribe(
      data => {
        console.log(data)
        alert('Zostałeś zarejestrowany, możesz się zalogować!');
      },
      error => {
        console.log(error);
      }
    );
  }

  loginUser(form: NgForm) {
    let payload = {
      username: form.value.email,
      password: form.value.password
    };
    this.authService.loginBasic(payload).subscribe(
      data => {
        // localStorage.setItem('user_id', data.user._id.toString());
        // localStorage.setItem('token', data.token);
        // localStorage.setItem('user_logged', 'true');

        // this.router.navigateByUrl('');
        console.log(data);
      },
      error => {
        if(error === 'Unauthorized'){
          alert('Błędne dane logowania!');
        }else{
          console.log(error);
        }
      }
    );
  }

}
