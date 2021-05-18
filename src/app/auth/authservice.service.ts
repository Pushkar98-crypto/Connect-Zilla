import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend} from "@angular/common/http"
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
   public tempData:any;

  loginCheck(usernam: any, passw: any, mail:any): any {
    
       console.log(this.tempData);
      for(let i=0;i<this.tempData.length;i++)
        {
          console.log(this.tempData[i].username)
          console.log(usernam);
          if(usernam===this.tempData[i].username  && passw===this.tempData[i].password && !this.tempData[i].isblocked)
            {
               localStorage.setItem('userid',"allowed");
              return true;  

            }

            
        }
   
  }

  constructor(private http:HttpClient, private router:Router) {
    this.http.get("http://localhost:3000/users").subscribe((data)=>{console.log(data);
    this.tempData=data;
   });

 
}


 



}
