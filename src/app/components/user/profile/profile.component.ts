import { Component, OnInit } from '@angular/core';
import {AdherentService} from '../../../services/Adherent.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AboutComponent} from './about/about.component';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

//import {AboutComponent} from './about/about.component';
//import {TimelineComponent} from './timeline/timeline.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[AboutComponent]
})


export class ProfileComponent implements OnInit {
  myForm:FormGroup
  fd : FormData
  selecteFile:File=null;
  element:HTMLImageElement;
  public imageSrc=null;
  public prenom="";
  public citation="من يحب الشجرة يحب أغصانها ";

 public isActive="about";


 handlefilenput(event){
    this.selecteFile=<File>event.target.files[0];
    this.fd = new FormData();
    this.fd.append('AdherentImage',this.selecteFile,this.selecteFile.name);
 }

 



  constructor(private adherentservice:AdherentService,private router:Router,private Actroute:ActivatedRoute , private about : AboutComponent){}


  ngOnInit()
   {
    console.log(this.isActive);
    this.isActive="about";

    this.adherentservice.getProfileAdherent(this.Actroute.snapshot.params['id'])
    .subscribe(data=>
      {

       let adherent=JSON.parse(JSON.stringify(data)).user;
      console.log(adherent.AdherentImage);
      let path = adherent.AdherentImage;
      this.imageSrc=path; 
      this.prenom=adherent.prenom;
      let  image = document.getElementById("img1") as HTMLImageElement;
          image.src=path;
    })



  }

  changepic()
  {
      this.adherentservice.updateImageAdherent(this.fd,this.Actroute.snapshot.params['id'])
      .subscribe(res=>
        {
        console.log(res);
          let  path=JSON.parse(JSON.stringify(res)).result.AdherentImage;
          console.log(path);
          this.imageSrc=path;
          
        this.ngOnInit();
          
          


      })
  }

  activeAbout()
  {
    this.isActive="about";
  }
  

  activeEdit()
  {
    this.isActive="edit";
  }
  activeEditPassword()
  {
    this.isActive="editPassword";
  }

}
