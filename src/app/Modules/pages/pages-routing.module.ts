import { HeaderComponent } from 'src/app/shared/Components/header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../../shared/Guards/auth-guard.guard';
const routes: Routes = [
  {
    path: 'user',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./user/user.module`).then(m => m.UserModule)
  },
  {
    path: 'post',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./post/post.module`).then(m => m.PostModule)
  },
  {
    path: 'category',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./category/category.module`).then(m => m.CategoryModule)
  },
  {
    path: 'contact',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./contact/contact.module`).then(m => m.ContactModule)
  },
  {
    path: 'notification',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./notification/notification.module`).then(m => m.NotificationModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./profile/profile.module`).then(m => m.ProfileModule)
  },
  {
    path: '',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./home/home.module`).then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
