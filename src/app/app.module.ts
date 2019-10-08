import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router' ;
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { LoginComponent } from './components/user/login/login.component';
import {AdherentService} from './services/Adherent.service';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule,MatCardModule,MatButtonModule,MatMenuContent,MatMenuModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { from } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap' ;
import { MatSnackBarModule } from "@angular/material";
import { LoginconfirmComponent } from './components/user/loginconfirm/loginconfirm.component';
import {AboutComponent} from './components/user/profile/about/about.component';
import { TimelineComponent } from './components/user/profile/timeline/timeline.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { EditprofileComponent } from './components/user/profile/editprofile/editprofile.component';
import { FooterComponentComponent } from './components/main/footer-component/footer-component.component';
import { EditPasswordComponent } from './components/user/profile/edit-password/edit-password.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HeaderComponentComponent } from './components/main/header-component/header-component.component';
import { NavBarComponent } from './components/main/header-component/nav-bar/nav-bar.component';
import { ImageSlideComponentComponent } from './components/main/header-component/image-slide-component/image-slide-component.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/main/home/home.component';
import { MainComponent } from './components/main/main.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CollectionComponent } from './components/user/collection/collection.component';
import { CollectionService } from './services/Collection.service';
import { OneCollectionComponent } from './components/user/collection/one-collection/one-collection.component';
import { FavorisComponent } from './components/user/favoris/favoris.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { Test1Component } from './test1/test1.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

const routes:Routes = [
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'account/profile/about/:id',component:AboutComponent},
  {path:'account/loginConfirm/:id',component:LoginconfirmComponent},
  {path:'account/profile/timeline/:id',component:TimelineComponent},
  {path:'account/profile/:id',component:ProfileComponent},
  {path:'account/profile/edit/:id',component:EditprofileComponent},
  {path:'home',component:HomeComponent},
  {path:'account/profile/editPassword/:id',component:EditPasswordComponent},
  {path:'welcome',component:MainComponent},
  {path:'account/collections/:id',component:CollectionComponent},
  {path:'account/collections/one/:id',component:OneCollectionComponent},
  {path:'account/favoris/:id',component:FavorisComponent}
];
  



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignupComponent,
    LoginComponent,
    LoginconfirmComponent,
    AboutComponent,
    TimelineComponent,
    ProfileComponent,
    EditprofileComponent,
    FooterComponentComponent,
    EditPasswordComponent,
    HeaderComponentComponent,
    NavBarComponent,
    ImageSlideComponentComponent,
    HomeComponent,
    MainComponent,
    CollectionComponent,
    OneCollectionComponent,
    FavorisComponent,
    Test1Component    
    

  ],
  
  imports: [MatSnackBarModule,
    BrowserModule,NgbModule,NgbPaginationModule,
    RouterModule,ReactiveFormsModule,
    HttpClientModule,MatToolbarModule,
    RouterModule.forRoot(routes),MatListModule,
    MatButtonModule,AngularFontAwesomeModule,
    MatCardModule,
    MatFormFieldModule,MatMenuModule,
    MatOptionModule,MatIconModule,
    MatSelectModule,MatDividerModule,
    MatInputModule,BrowserAnimationsModule,MaterialFileInputModule
  ,BsDropdownModule.forRoot(),
  NgxIntlTelInputModule,FormsModule,MatTabsModule
]

  ,
  providers: [AdherentService,CollectionService,{ provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
