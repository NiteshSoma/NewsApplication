import { Component, OnInit, HostListener } from '@angular/core';
import { EverythingService } from '../services/everything.service';
import { Fav } from '../model/favourite';
import { FavouriteService } from '../services/favourite.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookmarkService } from '../services/bookmark.service';

import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/model.user';

@Component({
  selector: 'app-everything',
  templateUrl: './everything.component.html',
  styleUrls: ['./everything.component.css'],
})
export class EverythingComponent implements OnInit {
  allNews: Array<Object>;
  dateNews: Array<Object>;
  errMessage: string;
  p: number = 1;
  searchText: string = '';
  from: string;
  to: string;
  currentDate = this.calender.getToday().day;
  currentMonth = this.calender.getToday().month;
  currentYear = this.calender.getToday().year;
  max = {
    year: this.currentYear,
    month: this.currentMonth,
    day: this.currentDate,
  };
  min = {
    year: this.currentYear,
    month: this.currentMonth - 1,
    day: this.currentDate,
  };
  year: string;
  month: string;
  date: string;
  selectedDate: NgbDate;
  username: string;
  fav = new Fav();
  isActive: boolean;
  mybutton = document.getElementById('myBtn');

  constructor(
    private everything: EverythingService,
    private calender: NgbCalendar,
    private favService: FavouriteService,
    private matSnackBar: MatSnackBar,
    private bookService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.fav.userId = this.username;
    this.allNews = [];
    this.selectedDate = this.calender.getToday();
    this.year = this.selectedDate.year.toString();
    this.month = this.selectedDate.month.toString();
    this.date = this.selectedDate.day.toString();
    this.from = this.year + '-' + this.month + '-' + this.date;
    this.to = this.year + '-' + this.month + '-' + this.date;

    this.everything.getEverythingdate(this.from, this.to).subscribe((data) => {
      let a = [];
      let b = [];
      let c = [];
      let Fl = [];
      let Ft: Array<String> = [];
      let disableFavButton: boolean = false;
      let disableBookButton: boolean = false;
      a.push(data);

      this.favService.favById(this.fav.userId).subscribe((data) => {
        Fl.push(data);
        Fl[0].forEach((item) => {
          Ft.push(item['data']['title']);
        });

        a[0]['articles'].forEach((element) => {
          let a2 = `${element['title']}`;

          disableFavButton = Ft.includes(a2) ? true : false;
          b.push({
            ...element,
            disableFavButton,
            publishedAt: element['publishedAt'].substring(0, 10),
          });
        });
      });
      let Bl = [];
      let Bt: Array<String> = [];
      this.bookService.recById(this.fav.userId).subscribe((data) => {
        Bl.push(data);
        Bl[0].forEach((item) => {
          Bt.push(item['data']['title']);
        });
        b.forEach((element) => {
          let a2 = `${element['title']}`;

          disableBookButton = Bt.includes(a2) ? true : false;
          c.push({
            ...element,
            disableBookButton,
          });
        });
        console.log(c);
      });
      this.allNews = c;
      console.log(this.allNews);
    });
  }
  @HostListener('window:scroll', []) onWindowScroll() {
    this.scrollFunction();
  }
  scrollFunction() {
    if (document.documentElement.scrollTop > 20) {
      document.getElementById('myBtn').style.display = 'block';
    } else {
      document.getElementById('myBtn').style.display = 'none';
    }
  }

  topFunction() {
    document.documentElement.scrollTop = 0;
  }

  getSearchedNews() {
    this.allNews = [];
    this.everything.getEveryThingSearch(this.searchText).subscribe((data) => {
      let a = [];
      let b = [];
      let c = [];
      let Fl = [];
      let Ft: Array<String> = [];
      let disableFavButton: boolean = false;
      let disableBookButton: boolean = false;
      a.push(data);

      this.favService.favById(this.fav.userId).subscribe((data) => {
        Fl.push(data);
        Fl[0].forEach((item) => {
          Ft.push(item['data']['title']);
        });

        a[0]['articles'].forEach((element) => {
          let a2 = `${element['title']}`;

          disableFavButton = Ft.includes(a2) ? true : false;
          b.push({
            ...element,
            disableFavButton,
            publishedAt: element['publishedAt'].substring(0, 10),
          });
        });
      });
      let Bl = [];
      let Bt: Array<String> = [];
      this.bookService.recById(this.fav.userId).subscribe((data) => {
        Bl.push(data);
        Bl[0].forEach((item) => {
          Bt.push(item['data']['title']);
        });
        b.forEach((element) => {
          let a2 = `${element['title']}`;

          disableBookButton = Bt.includes(a2) ? true : false;
          c.push({
            ...element,
            disableBookButton,
          });
        });
        console.log(c);
      });
      this.allNews = c;
      console.log(this.allNews);
    });
  }

  dateSelect(date: NgbDate) {
    this.year = date.year.toString();
    this.month = date.month.toString();
    this.date = date.day.toString();
    this.from = this.year + '-' + this.month + '-' + this.date;
    this.to = this.year + '-' + this.month + '-' + this.date;
    this.allNews = [];
    this.everything.getEverythingdate(this.from, this.to).subscribe((data) => {
      let a = [];
      let b = [];
      let c = [];
      let Fl = [];
      let Ft: Array<String> = [];
      let disableFavButton: boolean = false;
      let disableBookButton: boolean = false;
      a.push(data);

      this.favService.favById(this.fav.userId).subscribe((data) => {
        Fl.push(data);
        Fl[0].forEach((item) => {
          Ft.push(item['data']['title']);
        });

        a[0]['articles'].forEach((element) => {
          let a2 = `${element['title']}`;

          disableFavButton = Ft.includes(a2) ? true : false;
          b.push({
            ...element,
            disableFavButton,
            publishedAt: element['publishedAt'].substring(0, 10),
          });
        });
      });
      let Bl = [];
      let Bt: Array<String> = [];
      this.bookService.recById(this.fav.userId).subscribe((data) => {
        Bl.push(data);
        Bl[0].forEach((item) => {
          Bt.push(item['data']['title']);
        });
        b.forEach((element) => {
          let a2 = `${element['title']}`;

          disableBookButton = Bt.includes(a2) ? true : false;
          c.push({
            ...element,
            disableBookButton,
          });
        });
        console.log(c);
      });
      this.allNews = c;
      console.log(this.allNews);
    });
  }

  addfav(news) {
    console.log('Hello');
    console.log('Article Selected: ' + news);

    console.log('Favourite-User: ' + this.fav.userId);
    console.log('Fav object data: ' + news);
    this.isActive = !this.isActive;
    this.fav.data = news;
    this.ngOnInit();
    this.favService.addfav(this.fav).subscribe((data: any) => {
      if (data === 'true') {
        this.matSnackBar.open('Already added to the favourites', '', {
          duration: 3000,
        });
      } else {
        this.matSnackBar.open('Added To Favourite', '', { duration: 3000 });
      }
    });
  }

  addBookmark(news) {
    console.log('Article Selected: ' + news);
    console.log('Bookmark-User: ' + this.fav.userId);
    this.fav.data = news;
    this.ngOnInit();
    this.bookService.addrec(this.fav).subscribe((data: any) => {
      if (data === 'true') {
        alert('already bookmarked');
      } else {
        this.matSnackBar.open('Bookmarked', '', { duration: 3000 });
      }
    });
  }
}
