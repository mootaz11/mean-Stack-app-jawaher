import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories=[
    {title:'حكمة 1',text:'this is categorie 2',image:'../../../../assets/images/image2.jpg'}
    ,
    {title:'حكمة 2',text:'this is categorie 3',image:'../../../../assets/images/image3.jpg'}
    ,

    {title:'حكمة 3 ',text:'this is categorie 4',image:'../../../../assets/images/image1.jpg'}
    
]
  constructor() { }

  ngOnInit() {

  }

}
