import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserhomeComponent } from './userhome/userhome.component';

import { FriendModule } from '../friend/friend.module';
import { FriendsComponent } from '../friend/friends/friends.component';




@NgModule({
  declarations: [
    UserhomeComponent
   

  ],
  imports: [
    CommonModule
   

  ]
})
export class UserModule { }
