import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FriendModule } from './friend/friend.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthguardGuard }  from './guard/authguard.guard'
import { AuthserviceService} from './auth/authservice.service'


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    LoginModule,
    FriendModule,
    AdminModule,
    FormsModule,
    HttpClientModule
  
  
  ],
  providers: [AuthguardGuard,AuthserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
