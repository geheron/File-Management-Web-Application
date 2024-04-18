import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdminComponent } from './register/register-admin/register-admin.component';
import { RegisterUserComponent } from './register/register-user/register-user.component';
import { UploadComponent } from './upload/upload.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FilelistComponent } from './filelist/filelist.component';
import { AuthguardService } from './services/authguard.service';
import { ReverseauthguardService } from './services/reverseauthguard.service';

const routes: Routes = [
  {
    path: '',
    //canActivate: [ReverseauthguardService],
    component: HomeComponent
  },
  {
    path: 'login',
    //canActivate: [ReverseauthguardService],
    component: LoginComponent
  },
  {
    path: 'register',
    //canActivate: [ReverseauthguardService],
    component: RegisterComponent,
    children: [
      { path: 'register-admin', component: RegisterAdminComponent },
      { path: 'register-user', component: RegisterUserComponent }
    ]
  },
  {
    path: 'upload',
    canActivate: [AuthguardService],
    component: UploadComponent
  },
  {
    path: 'profile',
    canActivate: [AuthguardService],
    component: ProfileComponent
  },
  {
    path: 'admin-profile',
    canActivate: [AuthguardService],
    component: AdminProfileComponent
  },
  {
    path: 'user-profile',
    canActivate: [AuthguardService],
    component: UserProfileComponent
  },
  {
    path: 'file-list',
    canActivate: [AuthguardService],
    component: FilelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
