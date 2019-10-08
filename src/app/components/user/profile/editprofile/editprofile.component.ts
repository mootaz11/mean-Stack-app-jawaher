import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {AdherentService} from '../../../../services/Adherent.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  updateForm:FormGroup
  
  constructor(private fb:FormBuilder , private route:Router,private actroute:ActivatedRoute,private adherentservice:AdherentService) {
      this.updateForm=fb.group({
       
        email:new FormControl('',Validators.required),
        numTel:new FormControl('',Validators.required),
        profession:new FormControl('',Validators.required)})
}

  
  
  
  ngOnInit() {
  }




  updateInformation(email,numTel,profession)
  {   

      this.adherentservice.updateProfileAdherent(this.actroute.snapshot.params['id'],email,numTel,profession)
      .subscribe(res=>{
          console.log(res);
          window.location.reload();
          

        }
        )


      }
      
      }
          
