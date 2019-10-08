import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { CustomValidators} from '../../../../custom-validators';
import {Router,ActivatedRoute} from '@angular/router';
import {AdherentService} from '../../../../services/Adherent.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  changePasswordForm:FormGroup
  public errorMessage="";
  
  constructor(private adherentservice:AdherentService,private route:Router,private actRoute:ActivatedRoute,private fb : FormBuilder) 
  {  this.changePasswordForm =fb.group({ 
    
    oldPass: new FormControl(
    '',[Validators.required,
  ,Validators.minLength(8)]
),

newPassword:new FormControl(
  '',[Validators.required,CustomValidators.patternValidator(/\d/, { hasNumber: true }),
    CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
    CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
,Validators.minLength(8)]
),

newPassword2:new FormControl(
  '',[Validators.required,CustomValidators.patternValidator(/\d/, { hasNumber: true }),
    CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
    CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
,Validators.minLength(8)]
)
}

)





  }

  ngOnInit() {
  }

changePassword(oldpass,newPass,newPass2)
{
  if(newPass!==newPass2){
    this.errorMessage="password didn't match ";
  
  }
  else {

    this.errorMessage="";
    this.adherentservice.updatePassword(oldpass,newPass,this.actRoute.snapshot.params['id'])
    .subscribe(res=>{
      let message= JSON.parse(JSON.stringify(res)).message;
      console.log(message);
      if(message==='password incorrect')
      {
        this.errorMessage='password incorrect';
      }
    })



       }

  

}



}
