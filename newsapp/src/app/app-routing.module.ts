import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EverythingComponent } from './everything/everything.component';

import { TopHeadlinesComponent } from './top-headlines/top-headlines.component';

import { FavouritesComponent } from './favourites/favourites.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';

import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { LoginguardGuard } from '../app/login.guard';
import {CoronavirusComponent} from '../app/coronavirus/coronavirus.component';
import {IplComponent} from '../app/ipl/ipl.component';


const routes: Routes = [
  { path: '', redirectTo: '/top-headlines', pathMatch: 'full' },

  { path: 'top-headlines', component: TopHeadlinesComponent },
  { path: 'everything', component: EverythingComponent },
  { path: 'dashboard', component: DashboardComponent },
  
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [LoginguardGuard],
  },
  {
    path: 'bookmark',
    component: BookmarksComponent,
    canActivate: [LoginguardGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'coronavirus', component:CoronavirusComponent},
  { path: 'ipl', component:IplComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
