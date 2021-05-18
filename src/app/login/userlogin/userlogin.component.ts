import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthserviceService } from '../../auth/authservice.service';
import { flatten } from '@angular/compiler';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';



import{ init } from 'emailjs-com';
init("user_WsVVvsm5Wkti0AH34jFTG");


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  public regForm: FormGroup
  public logForm: FormGroup
  public verifyForm: FormGroup
  public issubmitted:boolean=false;
  public issub:boolean=false
  public imagePath: any;
  public imgURL: any;
  public message:any;
  public loginForm:boolean=false;
  public registerForm:boolean=false;
  public currentID:any;
  public currentInfodata:any;
  public code:any;
  public mainUrl:any="http://localhost:3000/users"
  public tempData:any;
  public infodata:any;
  public ran:any;

  constructor(private router: Router, private formbuilder:FormBuilder, private http:HttpClient, private authservice :AuthserviceService) {
    this.regForm=this.formbuilder.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phoneNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      address:['',Validators.required],
      age:[''],
      profession:[''],
      nationality:[''],
      marital:[''],
      bio:[''],
      username:['',Validators.required],
      password: ['',Validators.required],
      confirmPassword:['',Validators.required],
      profilepic:[],
      isblocked:[false],
      friends:[[]],
      verified:[false],
      req:[[]]

    


})
  this.logForm=this.formbuilder.group({

    username:['',Validators.required],
    password: ['',Validators.required]

  })
  this.verifyForm=this.formbuilder.group({

     code:['']

  })




   }

  ngOnInit(): void {

   this.http.get("http://localhost:3000/users").subscribe(data=>{
    this.infodata=data;

   })

    this.ran=Math.floor(Math.random()*100000+1);
   
   
  }

  get control()
  {
    return this.regForm.controls
  }
  get logControls()
  {
    return this.logForm.controls
  }
   submit()
   {
    this.issubmitted=true;
    console.log(this.regForm.value.name);
    console.log(this.regForm.value.email);
    console.log(this.regForm.value.profilepic);
    this.regForm.value.profilepic=this.imgURL;
    this.http.post(this.mainUrl,this.regForm.value).subscribe((data)=>
    {
       console.log(data,"line no 66"); 
    });
     this.issubmitted=false;
     alert("Registred Plase verify yourself")

    this.regForm.reset();

   }

  
  preview(event: any) {
    const selectedfile=event.target.files[0];
    if (selectedfile.length === 0)
      return;

    const reader = new FileReader();
     this.imagePath = selectedfile;
    
     reader.readAsDataURL(selectedfile); 
     reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      console.log(this.imgURL)
    }

    console.log(selectedfile);
    
  }
  public sendEmail(e:Event) {
    console.log(e.target,"Line 119");
    e.preventDefault();
    
    emailjs.sendForm('service_u8i96xb', 'template_xfy8xv7', e.target as HTMLFormElement, 'user_WsVVvsm5Wkti0AH34jFTG')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    
  }



  login()
  {
    this.issub=true;
   
   for(var i=0;i<this.infodata.length;i++)
   {
     if(this.infodata[i].username==this.logForm.value.username)
     {
       this.currentInfodata=this.infodata[i];
       console.log(this.currentInfodata)
       this.currentID=this.infodata[i].id;
     }
   }    

   if (this.currentInfodata.verified)

   {
   
    if(this.authservice.loginCheck(this.logForm.value.username,this.logForm.value.password,this.logForm.value.email))
    {
      const currentId=this.logForm.value.id;
      console.log("working")
      this.router.navigate(['userlogin/userhome/'+`${this.logForm.value.username}`])
    } 
   else {
     this.router.navigateByUrl('userlogin');

   }
this.issub=false;

  }

   

 


    
  
  }

  getcode()
  {
    const ap:any=  document.getElementById("id1");
    ap.click();
  }
 verifying()
{

    
    for(var i=0;i<this.infodata.length;i++)
    {
      if(this.infodata[i].username===this.logForm.value.username)
      {
        this.currentInfodata=this.infodata[i];
        this.currentID=this.infodata[i].id;
      }
    } 
    console.log(this.code);
    console.log(this.ran);
    
    if(this.ran==this.code)
    {
      alert("Verified");
      this.http.patch("http://localhost:3000/users/"+`${this.currentID}`,{
      verified:true

      }).subscribe((getfresh)=>
      {
        console.log(getfresh);
      })
    }
    else
    {
      alert("Wrong code");
    }
    
  }
  showLoginForm()
  {
    this.loginForm=true;
    this.registerForm=false;

  }
  showregisterForm()
  {
    this.registerForm=true;
    this.loginForm=false;
  }
}
