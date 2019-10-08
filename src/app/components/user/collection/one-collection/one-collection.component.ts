import { Component, OnInit } from '@angular/core';
import {CollectionService} from '../../../../services/Collection.service';
import {FormGroup,FormBuilder} from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-one-collection',
  templateUrl: './one-collection.component.html',
  styleUrls: ['./one-collection.component.css']
})

export class OneCollectionComponent implements OnInit {
  closeResult="";
  public collection=null;
  public editForm:FormGroup
  
  constructor(private modalService: NgbModal ,private fb:FormBuilder , private collectionservice:CollectionService,private Actroute:ActivatedRoute,private route:Router)
  
  { 
    this.editForm=fb.group({
      namecollection:''
    })
  }




  ngOnInit() {
    this.showCollectionInformations();

  }
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  editCollection(namecollection)
  {
    this.collectionservice.editCollection(this.Actroute.snapshot.params['id'],namecollection)
    .subscribe(res=>{
        this.ngOnInit();
    })
  }




  deleteCollection(){
    this.collectionservice.deleteCollection(this.Actroute.snapshot.params['id'])
    .subscribe(()=>{

      this.route.navigateByUrl(`account/collections/${localStorage.getItem('idAdherent')}`);
    
    })

  }


showCollectionInformations(){
  
this.collectionservice.showOneCollection(this.Actroute.snapshot.params['id'])
.subscribe(result=>{
  console.log(result);
    this.collection=JSON.parse(JSON.stringify(result)).collection;
});

}


}
