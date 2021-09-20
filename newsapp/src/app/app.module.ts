import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PipeTransform } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopHeadlinesService } from './services/top-headlines.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TopHeadlinesComponent } from './top-headlines/top-headlines.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { EverythingComponent } from './everything/everything.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpModule } from '@angular/http';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';


import { NgxPaginationModule } from 'ngx-pagination';
import { NewsService } from './shared/news.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


import {
  MatMenuModule,
  MatTableModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSlideToggleModule,
  MatOptionModule,
  MatSidenavModule,
  MatListModule,
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FavouritesComponent } from './favourites/favourites.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';


import { AuthenticationService } from './authentication.service';
import { RouterserviceService } from './routerservice.service';
import { Routes, RouterModule } from '@angular/router';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoginguardGuard } from './login.guard';
import { MatDialogModule } from '@angular/material/dialog';

import { User } from './model/model.user';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FooterComponent } from './footer/footer.component';
import { CoronavirusComponent } from './coronavirus/coronavirus.component';
import { IplComponent } from './ipl/ipl.component';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    TopHeadlinesComponent,
    EverythingComponent,
    DashboardComponent,
    FavouritesComponent,
    BookmarksComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    CoronavirusComponent,
    IplComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatMenuModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatSidenavModule,
    MatListModule,
    NgxPaginationModule,
    NgbCollapseModule,
    HttpModule,
    MatDialogModule,
    
   
  
    MatSnackBarModule
  ],
  exports: [MatDatepickerModule, MatNativeDateModule],

  providers: [HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService , multi: true },
    AuthenticationService,RouterserviceService, LoginguardGuard,
    TopHeadlinesService, NewsService, DatePipe,User],
  bootstrap: [AppComponent],
})
export class AppModule {}
