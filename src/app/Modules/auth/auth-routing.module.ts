import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'password',
    loadChildren: () => import(`./reset-password/reset-password.module`).then(m => m.ResetPasswordModule)
  },
  {
    path: '',
    loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
