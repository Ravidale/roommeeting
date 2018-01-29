import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";


@Component({
  selector: 'app-newroom',
  templateUrl: './newroom.component.html',
  styleUrls: ['./newroom.component.css']
})
export class NewroomComponent implements OnInit {


  file : File;
  imagePath = "";

  constructor(private http : Http , private route : Router){ }

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
  }

  fileChange($event){
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  upload(f : NgForm){
if(f.value.name =="" || f.value.location == "" || f.value.price == "" || f.value.description == "" || f.value.telephone == "" || f.value.email == ""){
  alert("Please fill all the blank")
}else{
  let formData = new FormData();
    f.value.status = "Available";
    formData.append("name", f.value.name);
    formData.append("location", f.value.location);
    formData.append("price", f.value.price);
    formData.append("status", f.value.status);
    formData.append("description", f.value.description);
    formData.append("telephone", f.value.telephone);
    formData.append("email", f.value.email);
    formData.append("picture", this.file);

    const token = localStorage.getItem("token");
    let header = new Headers({ "Authorization" : "Bearer " + token});

    // let header = new Headers({ "Content-Type" : "multipart/form-data"});
    let options = new RequestOptions({ headers:header});   
    this.http.post("http://localhost:3000/api/employee/new", formData, options)
    .subscribe(
      result => {
        console.log(result.json());
        this.imagePath = result.json().path;
        alert("Add Room Successfull!")
        this.route.navigate(['/view']);

      }, 
      error => {
        console.log(error);
      },
    );
}
  
  }


}
