import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

   public showData:any
   public changeData:any

  ngOnInit(): void {
     this.displayDataOnInit()
  }


  displayDataOnInit(){

     this.http.get("http://localhost:3000/users").subscribe((data)=>
     {
       this.showData = data;
     })
  }

  blocking(id:any)
  {
    this.http.get("http://localhost:3000/users/"+`${id}`).subscribe((data)=>
    {
      
      this.changeData=data;
      this.changeData.isblocked=true;
      console.log(this.changeData)
      this.http.put("http://localhost:3000/users/"+`${id}`,this.changeData).subscribe((data)=>
     {
        console.log(data);
     })
      
    })
   
    
  }
  unblocking(id:any)
  {
    this.http.get("http://localhost:3000/users/"+`${id}`).subscribe((data)=>
    {
      
      this.changeData=data;
      this.changeData.isblocked=false;
      console.log(this.changeData)
      this.http.put("http://localhost:3000/users/"+`${id}`,this.changeData).subscribe((data)=>
     {
        console.log(data);
     })
      
    })
   
    
  }
  logout()
  {
    localStorage.removeItem('admin');
    this.router.navigateByUrl('adminlogin')
  }

}
