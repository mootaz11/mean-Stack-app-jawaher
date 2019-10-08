import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { NgModule } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  searchForm : FormGroup

  public isLoggedin="";
  
  constructor(private route:Router) { }

  ngOnInit() {
    if(localStorage.getItem('idAdherent')===null){
        console.log(localStorage.getItem('idAdherent'))
      this.isLoggedin='false';
      this.route.navigateByUrl('/welcome')
    }
    else {
      this.isLoggedin='true'
    }
  }

  gotoProfile()
  {
  
    console.log(localStorage.getItem('idAdherent'));
    this.route.navigateByUrl(`/account/profile/${localStorage.getItem('idAdherent')}`) ;   
  }

  gotoCollections()
  {
  
    this.route.navigateByUrl(`/account/collections/${localStorage.getItem('idAdherent')}`);


  }
  
  logOut()
  
  {   
    window.location.reload();      
    localStorage.removeItem('idAdherent');
    
    this.route.navigateByUrl("/welcome");


  }

  gotoFavoris(){
    this.route.navigateByUrl(`/account/favoris/${localStorage.getItem('idAdherent')}`);
  }




}
