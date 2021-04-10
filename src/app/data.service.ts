import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject} from "rxjs";
import { Observable } from 'rxjs/Observable';

@Injectable({providedIn: 'root'})

export class DataService
{
    constructor(){}
  
    appData = new BehaviorSubject<object>({});
    setValue(newValue)
    {
      this.appData.next(newValue);
    }

    check2 = new BehaviorSubject<number>(3);
    checkValue(newValue)
    {
      this.check2.next(newValue);
    }

    forbiddenUsernames = ['John','Wick'];
  
    getState(selected)
    {
        var states=[];
        if(selected=="India"){
            states=["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
              "Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
              "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand","Uttar Pradesh","West Bengal"];
          }
        else if(selected=="USA")
          {
            states=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii",
            "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota",
            "Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina",
            "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee",
            "Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
          }
        else if(selected=="UK")
        {
            states=["Scotland","Northern Ireland","Wales","North East","North West","Yorkshire and the Humber","West Midlands","East Midlands",
                    "South West","South East","East of England","Greater London"];
        }
        else if(selected=="Japan")
        {
            states=["Hokkaido","Tohoku","Kanto","Chubu","Kinki/Kansai","Chugoku","Shikoku","Kyushu"];
        }
        else if(selected=="France")
        {
            states=["Grand-Est","Nouvelle-Aquitaine","Auvergne-Rhône-Alpes","Bourgogne-Franche-Comté","Occitanie","Hauts-de-France","Normandie",
                "Bretagne","Corse","Centre","Île-de-France","Pays de la Loire","Provence-Alpes-Côte d’Azur"];
        }
        else if(selected=="Russia")
        {
            states=["Adygey", "Altai", "Bashkortostan", "Buryat", "Chechnya", "Chuvash", "Dagestan", "Ingushetia", "Kabardino-Balkar","Sakha", 
        "Kalmykia","Karachay-Cherkess","Karelia","Khakass","Komi","Mari El","Mordovia","North Ossetia-Alania", "Tatarstan","Tuva","Udmurt"];
        }
        return states;
    }

    setValidators()
    {
        var fg=new FormGroup({
            'fname': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
            'lname': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
            'dob': new FormControl(null, [Validators.required, this.dobValidation.bind(this)]),
            'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
            'gender': new FormControl(null),    
            'phone':new FormControl(null, [Validators.required, this.phoneValidation.bind(this)]),
            'phone2':new FormControl(null, [this.phoneValidation.bind(this)]), 
            'city': new FormControl(null),
            'state':new FormControl(null, Validators.required),        
            'country':new FormControl(null,Validators.required),
          })
        return fg; 
    }
    
    forbiddenNames(control: FormControl): {[s: string]: boolean} {
        if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
          return {'nameIsForbidden': true};
        }
        return null;
      }

      aadharValidation(control: FormControl): {[s: string]: boolean} {
        var strval=String(control.value);
        if (strval.length != 12 && strval!="null") {
          return {'invalidAadhar': true};
        }
        return null;
      }

      dobValidation(control:FormControl):{[s: string]: boolean} {
        var curr=new Date();
        if (new Date(control.value)>curr) {
          return {'invalidDate': true};
        }
        return null;
      }

      pinValidation(control: FormControl): {[s: string]: boolean} {
        var strval=String(control.value);
        if (strval.length != 6 && strval!="null") {
          return {'invalidPin': true};
        }
        return null;
      }

      phoneValidation(control: FormControl): {[s: string]: boolean} {
        var strval=String(control.value);
        
        if(!(strval.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)) && !(strval==""||strval=="null")){
          return {'invalidPhone': true};
        }
        return null;
      }
      
      forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject) => {
          setTimeout(() => {
            if (control.value === "someone@example.com") {
              resolve({'emailIsForbidden': true});
            } else {
              resolve(null);
            }
          }, 1500);
        });
        return promise;
      }
}