import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdherentService } from '../../../services/Adherent.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomValidators} from '../../../custom-validators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})





export class SignupComponent implements OnInit {
  selectedFile:File=null;
  fd = new FormData();
  public Strength="";




  handlefileInput(event) {
    this.selectedFile=<File>event.target.files[0];

    this.fd = new FormData();

    this.fd.append('AdherentImage',this.selectedFile,this.selectedFile.name);  
  }

  

  


  

  CreateForm: FormGroup;

  constructor(private snackbar :MatSnackBar , private adherentservice: AdherentService, private route: Router, private fb: FormBuilder) {
    this.CreateForm = this.fb.group({
      nom: new FormControl('',Validators.compose( [
        Validators.required,
        Validators.minLength(3)])),
      prenom:  new FormControl('',Validators.compose( [
        Validators.required,
        Validators.minLength(3)])),
      ville: new FormControl('',Validators.compose( [
        Validators.required,
        Validators.minLength(3)])) 
        ,

      pays: '',
      profession:  new FormControl('',Validators.compose( [
        Validators.required,
        Validators.minLength(4)])),
      education: '',
      numTel:  new FormControl('',Validators.compose( [
        Validators.required,
        Validators.minLength(12)])),
      naissance: '',

      email:  new FormControl('',Validators.compose( [
        Validators.required,Validators.email])),
      genre: '',
      Siteweb: '',
      interests: '',

      password: new FormControl(
        '',[Validators.required,CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ,Validators.minLength(8)]
    
    )

  }
  )
}


opensnackbar(text:string){
  
this.snackbar.open(text,'اغلاق',{duration:2000})
}


/*checkPassword(pass:string){
return ( pass.length >9  && (pass.toLowerCase()!==pass) && (pass.toUpperCase()!==pass))

}*/



  addAdherent(nom, prenom, ville, pays, profession, education, numTel, naissance, email, genre, Siteweb, interests,password) {

    let pass=JSON.stringify(password);
    
    
    

    this.fd.append('nom',nom);
    this.fd.append('prenom',prenom);
    this.fd.append('ville',ville);
    this.fd.append('pays',pays);
    this.fd.append('profession',profession);
    this.fd.append('education',education);
    this.fd.append('numTel',numTel);
    this.fd.append('naissance',naissance);
    this.fd.append('email',email);
    this.fd.append('genre',genre);
    this.fd.append('Siteweb',Siteweb);
    this.fd.append('interests',interests);
    this.fd.append('password',password);






    this.adherentservice.signUpAdherent(this.fd) .subscribe((result) => {
      this.opensnackbar(' تم   الرجاء تفعيل الحساب ');
      const idAdherent=JSON.parse(JSON.stringify(result)).adherent._id;
      console.log(idAdherent);
    })




  }
  
    





  ngOnInit() {

  }

}
