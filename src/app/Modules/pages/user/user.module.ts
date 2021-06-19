import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//required imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { UserRoutingModule } from './user-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';

import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AddComponent,
    ViewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class UserModule { }
