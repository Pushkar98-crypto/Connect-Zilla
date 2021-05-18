import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeloginComponent } from './login/homelogin/homelogin.component'
import { UserloginComponent } from './login/userlogin/userlogin.component'
import { AdminloginComponent } from './login/adminlogin/adminlogin.component'
import { UserhomeComponent }  from './user/userhome/userhome.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component'
import { FriendsComponent }  from './friend/friends/friends.component'

const routes: Routes = [
 
{
  path:'',component:HomeloginComponent
},
{
  path:'userlogin',component:UserloginComponent
},
{
  path:'adminlogin',component:AdminloginComponent
},
{
  path:'userlogin/userhome/:id',component:UserhomeComponent
},
{
  path:'adminlogin/adminhome',component:AdminhomeComponent
},
{
  path:'friends',component:FriendsComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
