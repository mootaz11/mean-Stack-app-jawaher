import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  public citations=[{title:'حكمة 1',text:' كلما ازدادت ثقافة المرء ازداد بؤسه',image:'../../../../assets/images/image2.jpg'}
  ,
  {title:'حكمة 2',text:' أن تضيء شمعة صغيرة خير لك من أن تنفق عمرك تلعن الظلام',image:'../../../../assets/images/image3.jpg'}
  ,

  {title:'حكمة 3 ',text:'نحن لا نحصل على السلام بالحرب وإنما بالتفاهم',image:'../../../../assets/images/image1.jpg'}
,{title:'حكمة 4 ',text:' إذا اختفى العدل من الأرض لم يعد لوجود الإنسان قيمة',image:'../../../../assets/images/image1.jpg'} 

];
  constructor() { }

  ngOnInit() {
  }

}
