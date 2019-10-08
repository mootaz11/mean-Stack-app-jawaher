import { Component, OnInit } from '@angular/core';
import {AdherentService} from '../../../../services/Adherent.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  myForm:FormGroup
  public adherent=null;
  public imageSrc=null;
  

  constructor( private adherentservice:AdherentService,private router:Router,private Actroute:ActivatedRoute){}


  ngOnInit() {
    this.adherentservice.getProfileAdherent(this.Actroute.snapshot.params['id'])
    .subscribe(data=>{

      this.adherent=JSON.parse(JSON.stringify(data)).user;
      console.log(this.adherent);
      console.log(this.adherent.AdherentImage);
      let path = this.adherent.AdherentImage;
      this.imageSrc=path; 
      console.log(this.imageSrc);
    })
  }
  refresh(){
    window.location.reload();
  }

}
