import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from '../share.service';
import { DataService } from '../data.service';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  providers:[]
})

export class DisplayComponent
{
  constructor(private shareService: ShareService, private dataService: DataService) { }
  @Input() user: {id, fname,lname,dob, email,gender,phone, phone2,city, state, country, rating};

  gimme(user)
  {
    var sendVar={id: user.id, fname: user.fname,lname: user.lname,dob: user.dob, email: user.email, gender:user.gender, 
      phone:user.phone, phone2:user.phone2, city:user.city, state:user.state, country:user.country, rating:user.rating}
    this.dataService.setValue(sendVar);
  }
}
