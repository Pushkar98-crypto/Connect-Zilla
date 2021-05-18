import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  
   public friendsData:any;

  ngOnInit(): void {
    this.http.get("http://localhost:3000/users").subscribe((data)=>
    {
      this.friendsData=data;
      
    })

  }

}
