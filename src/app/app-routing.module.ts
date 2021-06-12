import { HeaderComponent } from 'src/app/shared/Components/header/header.component';
import { AuthGuardGuard } from './shared/Guards/auth-guard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from 'src/app/shared/Components/error/error.component'

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardGuard], //This route should be activated based on the logged in user,
    component: HeaderComponent,
    loadChildren: () => import(`./Modules/pages/pages-routing.module`).then(m => m.PagesRoutingModule)
  },
  {
    path: 'login',
    loadChildren: () => import(`./Modules/auth/auth-routing.module`).then(m => m.AuthRoutingModule)
  },
  {path: '404', component: ErrorComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
