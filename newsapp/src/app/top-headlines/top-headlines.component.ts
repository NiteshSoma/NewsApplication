import { Component, Input, OnInit, HostListener } from '@angular/core';
import { TopHeadlinesService } from '../services/top-headlines.service';
import { CountryService } from '../services/country.service';
import { Country } from '../model/country';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';
import { User } from '../model/model.user';
import { FavouriteService } from '../services/favourite.service';
import { Fav } from '../model/favourite';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookmarkService } from '../services/bookmark.service';
import 'rxjs/add/operator/map';
import { EverythingService } from '../services/everything.service';
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'app-top-headlines',
  templateUrl: './top-headlines.component.html',
  styleUrls: ['./top-headlines.component.css'],
})
export class TopHeadlinesComponent implements OnInit {
  topHeadlines: Array<Object> = [];
  errMessage: string;
  selectedValue: string;
  country: string;
  allCountries: Array<Country>;
  p: number = 1;
  searchText: string = '';
  category: string;
  selected: string = '';
  allCategories: Array<Category>;
  selectedCountry: string = '';
  currentUser: User;
  CatSelected: string = '';
  username: string;

  mArticles: Array<any>;
  mSources: Array<any>;
  source: string;
  isActive: boolean;
  fav = new Fav();
  favList: Array<Object>;
  count: number;
  favTitles: Array<String>;
  mybutton = document.getElementById('myBtn');

  constructor(
    private top: TopHeadlinesService,
    private cService: CountryService,
    private catService: CategoryService,
    private favService: FavouriteService,
    private matSnackBar: MatSnackBar,
    private bookService: BookmarkService,
    private everything: EverythingService
  ) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.fav.userId = this.username;

    this.allCategories = this.catService.getCategories();
    this.allCountries = this.cService.getCountries();

    this.top.getTopHeadlinesConCat('in', 'general').subscribe((data) => {
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
      });

      this.topHeadlines = c;
      console.log(this.topHeadlines);
    });
  }

  @HostListener('window:scroll', []) onWindowScroll() {
    this.scrollFunction();
  }
  scrollFunction() {
    if (
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById('myBtn').style.display = 'block';
    } else {
      document.getElementById('myBtn').style.display = 'none';
    }
  }

  topFunction() {
    document.documentElement.scrollTop = 0;
  }
  
  public onOptionsSelected(event) {
    this.topHeadlines = [];
    this.selectedCountry = event.target.value;
    this.top.getTopHeadlinesCountry(this.selectedCountry).subscribe((data) => {
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

  public onOptionsSelectedCat(event) {
    this.topHeadlines = [];
    const value = event.target.value;
    this.CatSelected = value;
    console.log(this.CatSelected);
    this.top
      .getTopHeadlinesConCat(this.selectedCountry, this.CatSelected)
      .subscribe((data) => {
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

  getSearchedNews() {
    this.topHeadlines = [];
    console.log(this.searchText);
    this.top.getSearchedNewsInTop(this.searchText).subscribe((data) => {
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
    console.log('Article Selected: ' + news);
    console.log('Favourite-User: ' + this.fav.userId);
    this.fav.data = news;
    this.ngOnInit();
    this.favService.addfav(this.fav).subscribe((data: any) => {
      console.log(data);
      if (data === 'Added') {
        this.matSnackBar.open('Added To Favourite', '', {
          duration: 3000,
        });
      }
    });
  }

  addBookmark(news) {
    console.log('Article Selected: ' + news);
    console.log('Bookmark-User: ' + this.fav.userId);
    this.fav.data = news;
    this.ngOnInit();
    this.bookService.addrec(this.fav).subscribe((data: any) => {
      console.log(data);

      if (data === 'Added') {
        this.matSnackBar.open('Added to bookmark', '', {
          duration: 3000,
        });
      } else {
        this.matSnackBar.open('Already bookmarked', '', { duration: 3000 });
      }
    });
  }
}
