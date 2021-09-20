import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { RouterserviceService } from '../routerservice.service';
import { register } from '../model/register';
import { login } from '../model/login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: register = new register();
  loginform: FormGroup;
  username: FormControl;
  password: FormControl;
  submitMessage: string;
  pic: string;
  message: string;
  returnUrl: string;
  flag: boolean = false;
  userName: string = '';
  recChildMessage: string;
  submitted = false;
  loading = false;
  constructor(
    private authservice: AuthenticationService,
    private routerservice: RouterserviceService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  register() {
    this.routerservice.toregister();
  }

  ngOnInit() {
    if (sessionStorage.getItem('key') != null) {
      this.router.navigate(['/top-headlines']);
    } else {
      this.loginform = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  }

  get f() {
    return this.loginform.controls;
  }

  loginSubmit() {
    this.submitted = true;

    if (this.loginform.invalid) {
      return;
    }
    this.loading = true;
    this.login.username = this.loginform.value.username;
    this.login.password = this.loginform.value.password;
    console.log('Login Submit: ' + this.loginform.value);
    this.authservice.getusers(this.loginform.value).subscribe(
      (data) => {
        this.authservice.setBearerToken(data['token']);
        console.log(data);
        this.pic = data['image'];
        localStorage.setItem('x', this.pic);
        if (data != null) {
          sessionStorage.setItem('key', this.submitMessage);
          this.flag = true;
          this.router.navigate(['/top-headlines']);
        }
      },
      (error) => {
        if (error) {
          console.log(error);
          this.matSnackBar.open('The credentials are incorrect', '', {
            duration: 3000,
          });
        }
      }
    );
  }
}
