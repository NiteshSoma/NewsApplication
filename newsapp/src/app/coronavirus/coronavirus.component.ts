import { Component, OnInit,HostListener } from '@angular/core';
import { Fav } from '../model/favourite';
import { FavouriteService } from '../services/favourite.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookmarkService } from '../services/bookmark.service';
import { EverythingService } from '../services/everything.service';

@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.component.html',
  styleUrls: ['./coronavirus.component.css']
})
export class CoronavirusComponent implements OnInit {
  allNews: Array<Object>;
  fav = new Fav();
   errMessage: string;
   p: number = 1;
   username: string;
   mybutton = document.getElementById("myBtn");

  constructor(private covid: EverythingService, private favService: FavouriteService,
    private matSnackBar: MatSnackBar,
    private bookService: BookmarkService) { }

  ngOnInit(): void {
    
    this.username = sessionStorage.getItem('username');
    this.fav.userId = this.username;
    this.allNews = [];
    this.covid.getEveryThingSearch('covid').subscribe((data) => {
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
}