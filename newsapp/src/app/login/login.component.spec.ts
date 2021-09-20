import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {  By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule, FormGroupDirective } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from '../authentication.service';
import { RouterserviceService } from '../routerservice.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';

import {FormControl,FormGroup,Validators} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('loginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService;
  let de:DebugElement;
  let el:HTMLElement;
  let authService: AuthenticationService;
  let routerService: RouterserviceService;
  let mySpy: any;
   
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        FormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        HttpClientModule,
        MatInputModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [AuthenticationService, RouterserviceService]
    })
    .compileComponents().then(()=>
    {
      fixture =TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
     
    });
  }));

  

  it('form invalid when username is empty', () => {
    expect(component.username.valid).toBeFalsy();
  });
  it('form invalid when password is empty', () => {
    expect(component.password.valid).toBeFalsy();
  });
  it('form should be invalid when the fields are left empty', async(() => {
    expect(component.username.valid).toBeFalsy();
    expect(component.password.valid).toBeFalsy();
  }));
  it('should set submitted to true',async(()=>{
    component.loginSubmit();
    expect(component.submitted).toBeTruthy();
  }));

  it(`should call the loginSubmit method`,async(()=>{
    fixture.detectChanges();
    spyOn(component,'loginSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.loginSubmit).toHaveBeenCalled();
  }));
  let check: any;
    mySpy = spyOn(authService, 'setBearerToken').and.callFake(() => {});
    authService.setBearerToken('');
    expect(mySpy).toHaveBeenCalled();
  });
  
  

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('works', () => {
  });
});