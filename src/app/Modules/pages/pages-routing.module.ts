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
    path: 'news',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./news/news.module`).then(m => m.NewsModule)
  },
  {
    path: 'event',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./event/event.module`).then(m => m.EventModule)
  },
  {
    path: 'donate',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./donate/donate.module`).then(m => m.DonateModule)
  },
  {
    path: 'newsletter',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./newsletter/newsletter.module`).then(m => m.NewsletterModule)
  },
  {
    path: 'images',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./images/images.module`).then(m => m.ImagesModule)
  },
  {
    path: 'forum',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./forum/forum.module`).then(m => m.ForumModule)
  },
  {
    path: 'donation',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import(`./donation-forum/donation-forum.module`).then(m => m.DonationForumModule)
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
