import { Component, OnInit, HostListener } from '@angular/core';
import { BookmarkService } from '../services/bookmark.service';
import { User } from '../model/model.user';
import { Fav } from '../model/favourite';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  username: string;
  constructor(
    private bookService: BookmarkService,
    private matSnackBar: MatSnackBar
  ) {}
  totalRecords: string;
  page = 1;
  b = [];
  a = [];
  p: number = 1;
  currentUser: User;
  fav = new Fav();
  recList: Array<Object>;
  isActive: boolean;
  noBook: string;
  mybutton = document.getElementById('myBtn');

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.fav.userId = this.username;
    this.bookService.recById(this.fav.userId).subscribe((data) => {
      this.recList = data;
      console.log(data);

      if (this.recList.length === 0) {
        this.noBook = 'No BookMarks Added';
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

  getBookmark() {
    this.bookService.recById(this.fav.userId).subscribe((data) => {
      this.recList = data;
    });
  }

  remBookMark(news) {
    console.log('Article deleted: ' + news);
    console.log('Favourite-User: ' + this.fav.userId);

    this.isActive = !this.isActive;
    this.fav.data = news;
    this.bookService.remRec(this.fav).subscribe(
      (data) => {},
      (err) => {
        console.log('Success');
        this.matSnackBar.open('Succesfully deleted', '', { duration: 3000 });
      }
    );
    this.getBookmark();
    this.ngOnInit();
  }
}
