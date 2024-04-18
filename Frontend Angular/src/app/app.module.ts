import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UploadComponent } from './upload/upload.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FilelistComponent } from './filelist/filelist.component';
import { DeleteComponent } from './filelist/delete/delete.component';
import { DownloadComponent } from './filelist/download/download.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register/register-user/register-user.component';
import { RegisterAdminComponent } from './register/register-admin/register-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDeleteComponent } from './user-list/user-delete/user-delete.component';
import { IdProfileComponent } from './filelist/id-profile/id-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InactivityService } from './services/inactivity.service';
import { InactivityInterceptor } from './http-interceptors/http-interceptor';
import { UploadFileComponent } from './filelist/upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UploadComponent,
    FilelistComponent,
    DeleteComponent,
    DownloadComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    RegisterUserComponent,
    RegisterAdminComponent,
    ProfileComponent,
    AdminProfileComponent,
    UserListComponent,
    UserDeleteComponent,
    IdProfileComponent,
    UserProfileComponent,
    UploadFileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    InactivityService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InactivityInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
