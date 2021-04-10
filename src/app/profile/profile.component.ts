import { Component, OnInit} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { ShareService } from '../share.service';
import { DataService } from '../data.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[]
})

export class ProfileComponent implements OnInit {

  genders = ['Male', 'Female','Other'];
  signupForm: FormGroup;
  submitted=false;
  states=[];
  countries = ['India', 'U.S.A', 'U.K', 'Japan', 'France', 'Russia'];
  received=false;
  disappear=false;
  colour="silver";
  id=-1;
  check2=3;
  showRating='';
  user = {
    fname: '',
    lname:'',
    dob:'',
    email: '',
    gender: '',
    phone:'',
    phone2:'',
    city:'',
    state:'',
    country:'', 
    rating:'',
  };
  constructor(private shareService: ShareService, private http: HttpClient, private dataService: DataService) {}

  ngOnInit() 
  {   
    this.dataService.appData.subscribe((data)=>
    {
      this.id=data['id'];
      if(this.id)
      {
        this.dataService.checkValue(2);
        this.showRating=data['rating'];
        this.user.rating=this.showRating;
        
        this.colour="yellow";
        this.states=this.dataService.getState(data['country']);
        this.signupForm.patchValue(
        {
          'userData': 
          {
            fname:data['fname'], 
            lname:data['lname'],  
            dob:data['dob'],
            email: data['email'],
            gender: data['gender'],
            phone:data['phone'],
            phone2:data['phone2'],
            city:data['city'],
            country:data['country'],
            state:data['state'],
            rating: data['rating'],
          }
        });
      }
    });

    this.dataService.check2.subscribe((data)=>
      this.check2=data,
    )

    this.signupForm = new FormGroup({
      'userData':this.dataService.setValidators(),
    });

    this.signupForm.patchValue({
      'userData': {
        'state':'',
        'country':'',}
      });
  }

  receivedRating(event)
  {
    if(this.check2!=2)
      {this.dataService.checkValue(1);}
    this.showRating=event;
    this.colour="yellow";
  }

  onSubmit() {
    this.signupForm.markAllAsTouched();
    
    if(!this.showRating)
    {
      this.dataService.checkValue(0);
    }
    
    if(this.signupForm.valid && this.check2)
    {
      this.user.fname = this.signupForm.value.userData.fname;
      this.user.lname = this.signupForm.value.userData.lname;
      this.user.dob= this.signupForm.value.userData.dob;
      this.user.email = this.signupForm.value.userData.email;
      this.user.gender = this.signupForm.value.userData.gender;
      this.user.phone = this.signupForm.value.userData.phone;
      this.user.phone2 = this.signupForm.value.userData.phone2;
      this.user.city = this.signupForm.value.userData.city;
      this.user.rating=this.showRating;
      this.user.state = this.signupForm.value.userData.state;
      this.user.country = this.signupForm.value.userData.country;
      
      if(this.check2==1)
      {this.shareService.newReview(this.user.fname,this.user.lname, this.user.dob, this.user.email, this.user.gender, this.user.phone, this.user.phone2, this.user.city, this.user.state, this.user.country, this.user.rating).subscribe(
        data=>console.log("Success", data),
        error=>console.error("Error", error),
      )}
      else
      {
        this.shareService.updateReview(this.id,this.user.fname,this.user.lname, this.user.dob, this.user.email, this.user.gender, this.user.phone, this.user.phone2, this.user.city, this.user.state, this.user.country, this.user.rating).subscribe(
          data=>console.log("Success", data),
          error=>console.error("Error", error),
        )
        location.reload();
      }
     
      this.submitted=true;
      this.signupForm.reset();
      this.dataService.checkValue(5);

      setTimeout(()=>{
        this.showRating='';
        this.colour="silver";
        this.states=[];
        this.submitted=false;
        this.signupForm.patchValue({
          'userData': {
            'state':'',
            'country':'',
          }
        });
      },2500);
    }
  }
  
  alertClose(){
    this.submitted=false;
  }

  openStates(){
    var selected=this.signupForm.value.userData.country;
    this.signupForm.patchValue({
      'userData':{'state':'',}
    })
    this.states=this.dataService.getState(selected);
  }
}
