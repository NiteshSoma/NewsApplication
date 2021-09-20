import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TopHeadlinesService } from '../services/top-headlines.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../model/model.user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterserviceService } from '../routerservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  mypic: String;
  flag: boolean;
  public isCollapsed = true;


  title: FormControl;
  currentUser: User;

  mArticles: Array<any>;
  mSources: Array<any>;
  source: string;

  newsSources: Array<any>;
  arrStr: Array<any>;

  str: string;
  constructor(
    private newsapi: TopHeadlinesService,
    private router: Router,

    private user: User,
    private routerService: RouterserviceService
  ) {}

  ngOnInit(): void {
    this.newsapi
      .initSources()
      .subscribe((data) => (this.mSources = data['sources']));

    let username = sessionStorage.getItem('username');

    if (sessionStorage.getItem('key') != null) {
      this.flag = false;
    } else {
      this.flag = true;
    }
    if (username) {
      this.mypic = localStorage.getItem('x');
    }
    this.str = username;
    if (username) {
      this.arrStr = this.str.split(/[@.]/);
    }
  }

  signout() {
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('x');
    this.router.navigate(['/login']);
    this.ngOnInit();
  }

  moveToEdit(){
    this.router.navigate(['/edit']);
  }

  
}
