import { Component, OnInit } from '@angular/core';
import {AdherentService} from '../../../services/Adherent.service';
import {Router} from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  LoginForm : FormGroup
  
  constructor(private snackbar : MatSnackBar ,private adherentService:AdherentService , private router:Router , private fb:FormBuilder ) {
      this.LoginForm=fb.group({
        email:'',
        password:''

      });
      }


  loginAdherent(email,password){
    if((email==='') && (password==='')){
      this.snackbar.open('   عذرا لا يوجد بيانات','close',{duration:2000});

    }


    else {
      this.adherentService.loginAdherent(email,password)
      .subscribe((res)=>{
        let resultat = JSON.parse(JSON.stringify(res))

     

        
        
        
        if(resultat.status==="200"){

          const idAdherent=JSON.parse(JSON.stringify(resultat)).user._id;
          console.log(JSON.parse(JSON.stringify(resultat)).user);
          console.log(idAdherent);
          localStorage.setItem('idAdherent',idAdherent);
          this.snackbar.open(resultat.message,'close',{duration:2000});
          console.log(localStorage.getItem('idAdherent'));
          window.location.reload();



      }
        else 
        { 
          this.snackbar.open(resultat.message,'close',{duration:2000});

        }

      })
    }
          }
    
    

  ngOnInit() {
  }

}
