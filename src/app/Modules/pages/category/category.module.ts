import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//required imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { CategoryRoutingModule } from './category-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
