import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { Router } from '@angular/router';
import {AuthserviceService } from '../../auth/authservice.service';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private router: Router, private formbuilder:FormBuilder, private http:HttpClient, private authservice :AuthserviceService) {
    this.logFormAdmin=this.formbuilder.group({

      username:['',Validators.required],
      password: ['',Validators.required]
  
  })
   }

  public logFormAdmin:FormGroup
  public issubmitted:boolean=false;
  public loginFormVisible:boolean=false;
  public validationData:any;

  ngOnInit(): void {

    

  }

  get logControls()
  {
    return this.logFormAdmin.controls
  }

  login()
  {
    this.issubmitted=true;

    this.http.get("http://localhost:3000/admindata").subscribe((data)=>
    {
      this.validationData=data;
      console.log(this.validationData[0].username)
      if(this.logFormAdmin.value.username===this.validationData[0].username && this.logFormAdmin.value.password===this.validationData[0].password)
      {
        console.log("work");
        localStorage.setItem("admin","allowed")
        this.router.navigateByUrl('adminlogin/adminhome');
      }
  else{
        console.log("Not")
        this.router.navigateByUrl('adminlogin');
      }
    })

    this.issubmitted=false;


  }

  showLoginForm()
  {
    this.loginFormVisible=true;
  }

}
