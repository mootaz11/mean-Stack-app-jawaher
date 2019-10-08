
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ICollection} from '../../models/collection.Model';



@Injectable({
    providedIn:'root'
})



export class CollectionService
{

public    uri='http://localhost:3000';
public     url='http://localhost:4200';

constructor( private  http:HttpClient , private  route:Router,private ActRoute:ActivatedRoute)
    {

    }

addCollection(namecollection,id)
    {
        return this.http.post(`${this.uri}/users/my/collections/${id}/addCollection`,{namecollection});
    }

showCollections(id):Observable<ICollection[]>
{

    return this.http.get<ICollection[]>(`${this.uri}/users/my/collections/${id}/getAll`)


}

deleteCollection(id){

   return this.http.delete(`${this.uri}/users/my/collections/${id}`);

}

editCollection(id,namecollection)
{
    return this.http.patch(`${this.uri}/users/my/collections/${id}/updateCollection`,{namecollection});

}

showOneCollection(idcollection):Observable<ICollection>
{

return this.http.get<ICollection>(`${this.uri}/users/my/collections/${idcollection}`)

}




}