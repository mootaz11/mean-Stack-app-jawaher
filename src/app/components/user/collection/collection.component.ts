import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {CollectionService} from '../../../services/Collection.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import {Router} from '@angular/router';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  public closeResult: string;
  public CreateCollectionForm:FormGroup
  public Collections=[];

  constructor(private modalService: NgbModal ,private collectionService:CollectionService,private route : Router ,private fb:FormBuilder){ 
    
    this.CreateCollectionForm=fb.group({
      namecollection:''
    });

  }






  ngOnInit() {
      this.refreshCollections();
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  checkCollection(i)
  
{  
  this.collectionService.showOneCollection(document.getElementsByClassName('square')[i].id)

  .subscribe(()=>{
this.route.navigateByUrl(`account/collections/one/${document.getElementsByClassName('square')[i].id}`)

})

}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addCollection(namecollection)
 
{ 
   this.collectionService.addCollection(namecollection,localStorage.getItem('idAdherent'))
.subscribe(()=>{
  this.ngOnInit();
})
}

refreshCollections(){
  this.collectionService.showCollections(localStorage.getItem('idAdherent'))
  .subscribe(data=>{

    const collections = JSON.parse(JSON.stringify(data)).results;
    this.Collections=collections;
    
    console.log(this.Collections);
})





}




}