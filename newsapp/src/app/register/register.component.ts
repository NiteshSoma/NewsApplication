import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { register } from '../model/register';
import { AuthenticationService } from '../authentication.service';
import { RouterserviceService } from '../routerservice.service';
import { Router } from '@angular/router';
import { login } from '../model/login';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register: register = new register();
  registerArray: Array<register> = [];
  reg: Array<any> = [];
  errorMessage: string;
  successFlag: boolean;

  users: login[];
  registerform: FormGroup;
  username: FormControl;
  password: FormControl;
  name: FormControl;
  image: FormControl;
  genre: FormControl;
  imageURL: string;
  message: string;
  successString: string;
  submitted = false;
  loading = false;

  @Output() nameEvent = new EventEmitter<string>();
  constructor(
    private authenticateService: AuthenticationService,
    private routerService: RouterserviceService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}
  fileSelected(event) {
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imageURL = reader.result.toString();
      console.log(this.imageURL);
    };
  }
  ngOnInit() {
    if (sessionStorage.getItem('key') != null) {
    } else {
      // (this.username = new FormControl('', Validators.required)),
      //   (this.password = new FormControl('', Validators.required)),
      //   (this.name = new FormControl('', Validators.required)),
      //   (this.image = new FormControl('', Validators.required)),
      //   (this.genre = new FormControl(''));
      // this.registerform = new FormGroup({
      //   username: this.username = new FormControl('', Validators.required),
      //   password: this.password = new FormControl('', Validators.required),
      //   name: this.name,
      //   image: this.image,
      //   genre: this.genre,
      // });

      this.registerform = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        name: this.name,
        image: this.image,
      });
    }
  }
  get f() {
    return this.registerform.controls;
  }
  login() {
    this.router.navigate(['/login']);
  }
  registerSubmit() {
    this.submitted = true;
    if (this.registerform.invalid) {
      return;
    }
    this.loading = true;
    this.register.password = this.registerform.value.password;
    this.register.username = this.registerform.value.username;
    this.register.name = this.registerform.value.name;
    this.register.image = this.imageURL;
    this.register.genre = this.registerform.value.genre;
    this.registerArray.push(this.register);
    this.authenticateService.addUser(this.register).subscribe((data) => {
      this.matSnackBar.open('Registration Successful!!', '', { duration: 3000 });
      
    },
      error => {
        if(error.status==0)
        {
          this.matSnackBar.open('Server Error', '', { duration: 3000 });
        }
        else if(error.status == 409){
          this.matSnackBar.open('Email Already Exixts', '', { duration: 3000 });
        }
      });
  }
}

