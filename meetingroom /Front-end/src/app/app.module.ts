import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule} from "@angular/router";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewroomComponent } from './newroom/newroom.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { SignupComponent } from './signup/signup.component';
import { DetailComponent } from './detail/detail.component';
import { UpdateComponent } from './update/update.component';
import { UpdatephotoComponent } from './updatephoto/updatephoto.component';




@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    LoginComponent,
    HomeComponent,
    NewroomComponent,
    UploadImageComponent,
    SignupComponent,
    DetailComponent,
    UpdateComponent,
    UpdatephotoComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    HttpModule, HttpClientModule,
    RouterModule.forRoot([
      {path : 'view', component : ViewComponent},
      {path : 'newroom', component : NewroomComponent},      
      {path : 'login', component : LoginComponent},
      {path : '', component : HomeComponent},
      {path : 'image', component : UploadImageComponent},
      {path : 'signup', component : SignupComponent},
      {path : 'update/:id', component : UpdateComponent},
      {path : 'detail/:id', component : DetailComponent},
      {path : 'updatephoto/:id', component : UpdatephotoComponent}




      
      
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
