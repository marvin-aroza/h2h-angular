import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonateRoutingModule } from './donate-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';

import { SharedModule } from 'src/app/shared/shared.module'

import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    AddComponent,
    ViewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DonateRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class DonateModule { }
