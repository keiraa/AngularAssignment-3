import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class ShareService
{
    constructor(private http: HttpClient){}
    newuser=[];
    forbiddenUsernames = ['John','Wick'];
    
    addReview(id: number, fname:string, lname:string,dob:string, email:string, gender:string, phone:string, phone2:string, 
        city:string, state:string, country:string, rating: string){
        this.newuser.push({id:id, fname: fname,lname: lname,dob:dob, email:email,gender:gender,phone:phone,
            phone2:phone2,city:city, state:state, country:country, rating:rating}); 
    }
    newReview(fname:string, lname:string,dob:string, email:string, gender:string, phone:string, phone2:string, 
        city:string, state:string, country:string, rating: string)
    {
        var user={fname: fname,lname: lname,dob:dob, email:email,gender:gender,phone:phone,
                    phone2:phone2,city:city, state:state, country:country, rating:rating};
        this.newuser.push(user); 
        return this.http.post<any>("http://localhost:3000/newuser",user);
    }
    updateReview(id:number,fname:string, lname:string,dob:string, email:string, gender:string, phone:string, phone2:string, 
        city:string, state:string, country:string, rating: string)
    {
        var user={fname: fname,lname: lname,dob:dob, email:email,gender:gender,phone:phone,
                    phone2:phone2,city:city, state:state, country:country, rating:rating};
        return this.http.put("http://localhost:3000/newuser/"+id, user);
    }
}