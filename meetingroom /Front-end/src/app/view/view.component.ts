import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private http : Http , private route : Router){ }

  file : File;
  imagePath = "";
  data = "";
  propertilist = [];
  updatelist = [];
  id = "";
  status = "";
  // userlist = [];

  ngOnInit() {
    const token = localStorage.getItem("token");
    console.log(token);
    if(!token){
      this.route.navigate(['/']);
      //redirect to login
    }else{
      let header = new Headers({ "Authorization" : "Bearer " + token});
      let options = new RequestOptions({ headers : header });
      this.http.post("http://localhost:3000/api/validatetoken", {}, options)
      .subscribe(
        result => {

        },
        error => {
          this.route.navigate(['/']);
        }
      )
    }
    this.loadItem();
    // this.loadUser();

  }

  loadItem(){
    const token = localStorage.getItem("token");
    let header = new Headers({ "Authorization" : "Bearer " + token})
    let options = new RequestOptions({ headers: header });

    this.http.get("http://localhost:3000/api/employee", options)
    .subscribe(
      result => {
        this.propertilist = result.json();
      },
      error => {
        
      }
    );


  }

  // loadUser(){
  //   const token = localStorage.getItem("token");
  //   let header = new Headers({ "Authorization" : "Bearer " + token})
  //   let options = new RequestOptions({ headers: header });

  //   this.http.get("http://localhost:3000/api/user", options)
  //   .subscribe(
  //     result => {
  //       this.userlist = result.json();
  //     },
  //     error => {
        
  //     }
  //   );


  // }

  updateData(id) {
    this.id = id;
    const token = localStorage.getItem("token");
    let header = new Headers({ "Authorization" : "Bearer " + token})
    let options = new RequestOptions({ headers : header });

    this.http.get("http://localhost:3000/api/employee/" + id, options)
    .subscribe(
      result => {

      },
      error => {
        console.log(error);
      }
    );
    
  }

  fileChange($event){
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  
checkAvailable(status, id){
  this.status = status;
  this.id = id;
  if(status == "Not Available"){
    alert("Room is not available");
  }
  else{
    this.route.navigate(['/detail', this.id]);
  }
}

  

  DeleteEmployeeData(id){
    if(confirm("Do you want to delete this?"))
    {
      const token = localStorage.getItem("token");
      let header = new Headers({ "Authorization" : "Bearer " + token})
      let options = new RequestOptions({ headers : header });
  
      this.http.delete("http://localhost:3000/api/employee/" + id, options)
      .subscribe(
        result => {
    
          this.loadItem();
        },
        error => {
          console.log(error);
        }
      );
    }else{
      this.route.navigate(['/view']);
    }
   
  }

}
