import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module'
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
    ContactRoutingModule,
    NgxPaginationModule
  ]
})
export class ContactModule { }
