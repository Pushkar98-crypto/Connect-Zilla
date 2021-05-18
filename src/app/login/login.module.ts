import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeloginComponent } from './homelogin/homelogin.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HomeloginComponent,
    UserloginComponent,
    AdminloginComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
