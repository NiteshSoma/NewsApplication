import { Component, OnInit,HostListener } from '@angular/core';
import { FavouriteService } from '../services/favourite.service';
import { User } from '../model/model.user';
import { Fav } from '../model/favourite';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  currentUser: User;
  fav = new Fav();
  mybutton = document.getElementById("myBtn");

  constructor(
    private favourite: FavouriteService,
    private matSnackBar: MatSnackBar
  ) {}
  totalRecords: string;
  page = 1;
  b = [];
  a = [];
  p: number = 1;
  favList: Array<Object>;
  isActive: boolean;
  noFav: string;
  username: string;

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.fav.userId = this.username;
    this.favourite.favById(this.fav.userId).subscribe((data) => {
      this.favList = data;
      if (this.favList.length === 0) {
        this.noFav = 'No Favourites Added';
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

  getFavById() {
    this.favourite.favById(this.fav.userId).subscribe((data) => {
      this.favList = data;
    });
  }
  remfav(news) {
    console.log('Article deleted: ' + news);
    console.log('Favourite-User: ' + this.fav.userId);

    this.isActive = !this.isActive;
    this.fav.data = news;
    this.favourite.remfav(this.fav).subscribe(
      (data) => {},
      (err) => {
        console.log('Success');
        this.matSnackBar.open('Succesfully deleted', '', { duration: 3000 });
      }
    );
    this.getFavById();
    this.ngOnInit();
  }
}
