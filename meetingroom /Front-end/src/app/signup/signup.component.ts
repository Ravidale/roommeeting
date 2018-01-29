import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http : Http, private router : Router) { }

  ngOnInit() {
  }

  Signup(f : NgForm) {
    if(f.value.username == "" || f.value.password == "" || f.value.email == "" || f.value.telephone == ""){
      alert("Please fill all the blank");
    }
    else{
      let obj = {
        username : f.value.username,
        password : f.value.password,
        email : f.value.email,
        telephone : f.value.telephone
      }
      let header = new Headers({ "Content-Type" : "application/json"});
      let options = new RequestOptions({ headers : header});
  
      this.http.post("http://localhost:3000/api/user/new", obj, options)
      .subscribe(
        result => {
          console.log(result.json());
          alert("Register successfull");
          this.router.navigate(['/']);
        },
        error => {
          console.log("Error")
        }
      )
    }
 
  }

}
