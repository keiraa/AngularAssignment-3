import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ShareService } from './share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ShareService]
})

export class AppComponent implements OnInit{
  msg="";
  constructor(private shareService: ShareService, private http:HttpClient ){
    http.get('http://localhost:3000/newuser').subscribe(response=>{
      if(response==""){
        this.msg="Sorry! No users as of now";
      }
      else{
        this.msg="";
        for(var i in response){
          var temp=response[i];
          this.shareService.addReview(temp.id, temp.fname,temp.lname,temp.dob, temp.email,temp.gender, temp.phone,
            temp.phone2, temp.city, temp.state, temp.country, temp.rating);
       }
      }
    });
  }

  newuser:{fname:string, lname:string,dob:string, email:string, gender:string, phone:string, phone2:string, 
        city:string, state:string, country:string, rating: string}[]=[];
  
  ngOnInit(){
    this.newuser=this.shareService.newuser;
  }
}
