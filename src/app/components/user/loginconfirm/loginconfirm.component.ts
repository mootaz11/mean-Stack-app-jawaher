import { Component, OnInit } from '@angular/core';
import {AdherentService} from '../../../services/Adherent.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-loginconfirm',
  templateUrl: './loginconfirm.component.html',
  styleUrls: ['./loginconfirm.component.css']
})
export class LoginconfirmComponent implements OnInit {
  confirmLogin:FormGroup
  isVerified:String="false";

  constructor(private snackbar : MatSnackBar ,private adherentService:AdherentService , private router:Router ,private routeAc:ActivatedRoute, private fb:FormBuilder )
   {
     this.confirmLogin=fb.group({
       email:'',
       password:''
     });


   }

  
   ngOnInit(){ 

  console.log(this.isVerified);
    this.changeisVerified();
  }

changeisVerified(){
  this.adherentService.getProfileAdherent(this.routeAc.snapshot.params['id'])
  .subscribe(res=>{
    let  user=JSON.parse(JSON.stringify(res)).user;
    console.log(user);
    this.isVerified=user.isVerified+'';
    console.log(this.isVerified);
  })}




confirmlogin(email,password){

  this.adherentService.loginconfirmAdherent(email,password)
.subscribe((result)=>{
  this.changeisVerified();
  console.log()
  const id=JSON.parse(JSON.stringify(result)).result._id
  localStorage.setItem('idAdherent',id);
  this.router.navigateByUrl('welcome');
  
})
}

}
