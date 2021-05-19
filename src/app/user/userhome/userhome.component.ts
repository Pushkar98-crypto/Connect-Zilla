import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http' 
import {Router} from '@angular/router'
import { ThrowStmt } from '@angular/compiler';




@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  constructor(private activatedRoute :ActivatedRoute,private http:HttpClient,private router:Router) { }

  public currentUser:any;
  public nowdata:any;
  public newdata:any;
  public currentId:any;
  public currTempData:any;
  public currUserData:any;
  public imgUrl:any;
  public imagePath:any;
  public friendsData:any;
  public newfriendsData:any=[]
  public currFriendsData:any=[]
  public changeData:any;
  public requestData:any=[]
  public currAcceptData:any;
  public peopleYouKnow:boolean=false;

  
  public updateUser:any


  ngOnInit(): void {
   
    this.http.get("http://localhost:3000/users").subscribe((data)=>
    {
      this.friendsData=data;
      this.currentId==this.getid()
   
     
     // console.log(this.friendsData,"Line 31b");
     // console.log(this.currentUser,"line 41");

      for(var i=0;i<this.friendsData.length;i++)
      {

       
        if(this.currentUser!=this.friendsData[i].username )
        { 
            this.currFriendsData.push(this.friendsData[i]);
            
           
        }
        if(this.currentUser== this.friendsData[i].username)
        {
          this.newdata=this.friendsData[i];
          this.currAcceptData=this.friendsData[i];
        }
        
         
      }
     

      for (var j=0;j<this.newdata.req.length;j++)
      {
        
        for(var k=0;k<this.friendsData.length;k++)
        {
           //  console.log(this.friendsData[k].username,"line 70");
             
          if(this.newdata.req[j]==this.friendsData[k].username)
          {
            this.requestData.push(this.friendsData[k]);
          }
        
        }
      }

      for (var j=0;j<this.currAcceptData.friends.length;j++)
      {
        console.log("working");
        for(var k=0;k<this.friendsData.length;k++)
        {
           //  console.log(this.friendsData[k].username,"line 70");
             
          if(this.currAcceptData.friends[j]==this.friendsData[k].username)
          {
            this.newfriendsData.push(this.friendsData[k]);
          }
        
        }
      }

     
     
        
        
           
        
        
       
   })

  
  
    this.accessroutes()

    
  }


  accessroutes()
  {
   // console.log(this.currTempData,"line 31");
    this.activatedRoute.params.subscribe((data)=>
    {
           
           this.currentUser=data.id;
           this.currentId=this.getid()
       

    

    

         
    })

    this.http.get("http://localhost:3000/users").subscribe((data)=>
    {
       
      this.currTempData=data;

      for(let i=0;i<this.currTempData.length;i++)
      {
        if(this.currentUser===this.currTempData[i].username)
        {
          this.currUserData=this.currTempData[i];
        }
      }


     
     
      
      
    })
  }
  
  adding(id:any)
  {

     this.currentId==this.getid()
   
    console.log(this.currentId,"line 93");
    this.http.get("http://localhost:3000/users/"+`${id}`).subscribe((data)=>
    {
      
      this.changeData=data;
      
      this.changeData.req.push(this.currentUser)

      
        // console.log(this.nowdata,"line 138");
         this.http.put("http://localhost:3000/users/"+`${id}`,this.changeData).subscribe((data)=>
         {
            console.log(data,"line 137");
         })
        
    
   
     
      
    })
    
    
  }

  accepting(id:any,user:any)
  {
    this.currentId==this.getid();

    this.http.get("http://localhost:3000/users/"+`${this.currentId}`).subscribe((data)=>
    {
      this.nowdata=data;
      this.nowdata.friends.push(user)
      this.nowdata.req.forEach((element:any,index:any)=>{
        if(element==user) this.nowdata.req.splice(index,1);
     });
      // console.log(this.nowdata,"line 138");
       this.http.put("http://localhost:3000/users/"+`${this.currentId}`,this.nowdata).subscribe((data)=>
       {
          console.log(data,"line 137");
       })
      
    })
 

  }









  getid()  {
    for(var k=0;k<this.friendsData.length;k++)
    {
      if(this.currentUser===this.friendsData[k].username)
      {
        this.currentId=this.friendsData[k].id;
        return this.currentId;
      }
    }
  
  }


  logout()
  {
    localStorage.removeItem('userid');
    this.router.navigateByUrl('userlogin');
  }

  showpeople()
  {
    if(this.peopleYouKnow)
    {
      this.peopleYouKnow=false;
    }
    else {
      this.peopleYouKnow=true;
    }
  }

}


