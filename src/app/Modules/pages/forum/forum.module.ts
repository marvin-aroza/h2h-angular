import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ViewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class ForumModule { }
