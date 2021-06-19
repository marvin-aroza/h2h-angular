import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    ListComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    NgxPaginationModule
  ]
})
export class NotificationModule { }
