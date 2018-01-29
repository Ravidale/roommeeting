import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
id2 = "";
  room = {};
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private http2 : Http) { }

  ngOnInit() {
    this.getDetail(this.route.snapshot.params['id']);
    const token = localStorage.getItem("token");
    console.log(token);
    if(!token){
      this.router.navigate(['/']);
      //redirect to login
    }else{
      let header = new Headers({ "Authorization" : "Bearer " + token});
      let options = new RequestOptions({ headers : header });
      this.http2.post("http://localhost:3000/api/validatetoken", {}, options)
      .subscribe(
        result => {

        },
        error => {
          this.router.navigate(['/']);
        }
      )
    }
  }

  getDetail(id) {
    this.http.get('http://localhost:3000/api/employee/detail/'+id).subscribe(data => {
      this.room = data;
    });
  }

  book(f : NgForm, id){
    this.id2 = id;
    let formData = new FormData();
    f.value.status = "Not Available"
    formData.append("name", f.value.name);
    formData.append("location", f.value.location);
    formData.append("price", f.value.price);
    formData.append("status", f.value.status);
    formData.append("description", f.value.description);
    formData.append("picture", f.value.picture);
    formData.append("telephone", f.value.picture);
    formData.append("email", f.value.picture);


    const token = localStorage.getItem("token");
    let header = new Headers({ "Authorization" : "Bearer " + token});

    // let header = new Headers({ "Content-Type" : "multipart/form-data"});
    let options = new RequestOptions({ headers:header});   
    this.http.put("http://localhost:3000/api/employee/book/" + this.id2, formData)
    .subscribe(
      result => {
      }, 
      error => {
        console.log(error);
        this.router.navigate(['/view']);
        alert("Booked successfully! Please wait for host to contact you")

      }
    );

  }

  // fileChange($event){
  //   this.file = $event.target.files[0];
  //   console.log(this.file);
  // }

}
