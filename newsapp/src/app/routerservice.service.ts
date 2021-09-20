import { Injectable } from '@angular/core';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RouterserviceService {

  constructor(private router:Router) { }


  todashboard(){
    this.router.navigate(['dashboard'])
  }
  tohome(){
    this.router.navigate(['home'])
  }
    
  tologin()
  {
    this.router.navigate(['login'])
  }
  toregister()
  {
    this.router.navigate(['register'])
  }
  toview()
  {
    this.router.navigate(['view'])
  }
   

}
