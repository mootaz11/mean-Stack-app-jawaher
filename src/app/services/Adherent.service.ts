import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {IAdherent}  from '../../models/adherent.Model';

@Injectable({
    providedIn:'root'
})
export class AdherentService{
    uri='http://localhost:3000';
    url='http://localhost:4200';

constructor(private http:HttpClient , private router:Router,private actroute:ActivatedRoute)
    {

        


    }



loginAdherent(email,password){
    const login={
        email:email,
        password:password}
        
       return this.http.post(`${this.uri}/user/login`,login);

}


loginconfirmAdherent(email,password){
    const login = {
    email:email,
    password:password}
    
   return  this.http.post(`${this.uri}/user/loginconfirm`,login);

}


signUpAdherent(formdata){
   
    

    return this.http.post(`${this.uri}/user/signup`,formdata);

}

updateImageAdherent(formdata,id){
    return this.http.patch(`${this.uri}/user/updatepic/${id}`,formdata);
    
}


getProfileAdherent(id):Observable<IAdherent>{
return this.http.get<IAdherent>(`${this.uri}/user/${id}`);
}







updateProfileAdherent(id,email,numTel,profession)
    {
    const Adherent={
        
        email:email,
        profession:profession,
        numTel:numTel}

return this.http.patch(`${this.uri}/user/${id}`,{Adherent});}


updatePassword(oldPass,newPassword,id){
return this.http.patch(`${this.uri}/user/changePassword/${id}`,{oldPass,newPassword})
}


}