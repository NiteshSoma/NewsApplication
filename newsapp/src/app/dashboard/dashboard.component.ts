import { Component, OnInit,HostListener } from '@angular/core';
import { NewsService } from '../shared/news.service';
import { NewsModel } from '../shared/news.model';
import { TopHeadlinesService } from '../services/top-headlines.service';
import { User } from '../model/model.user';
import { FavouriteService } from '../services/favourite.service';
import { Fav } from '../model/favourite';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookmarkService } from '../services/bookmark.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  articles: any;
  temp: NewsModel = new NewsModel();
  p: number = 1;

  mSources: Array<any>;
  source: string;
  topHeadlines: Array<Object> = [];
  username: string;
  isActive: boolean;
  fav = new Fav();
  errMessage: string;
  mybutton = document.getElementById("myBtn");


  constructor(
    public top: TopHeadlinesService,
    public newsService: NewsService,
    private favService: FavouriteService,
    private matSnackBar: MatSnackBar,
    private bookService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.fav.userId = this.username;
    this.top
      .initSources()
      .subscribe((data) => (this.mSources = data['sources']));
    this.topHeadlines = [];

    this.top.getSources('the-hindu').subscribe((data) => {
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
      this.topHeadlines = c;
      console.log(this.topHeadlines);
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
  searchArticles(source) {
    this.topHeadlines = [];
    console.log('selected source is:' + source);
    this.top.getSources(source).subscribe((data) => {
      if (data) {
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
        this.topHeadlines = c;
        console.log(this.topHeadlines);
      } else {
        this.errMessage = 'unable to fetch';
      }
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
        // this.matSnackBar.open('Already Bookmarked', '', {
        //   duration: 3000
        // });
        alert('already bookmarked');
      } else {
        this.matSnackBar.open('Bookmarked', '', { duration: 3000 });
      }
    });
  }
}
