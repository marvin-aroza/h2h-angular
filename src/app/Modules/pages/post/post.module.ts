import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { CKEditorModule } from 'ckeditor4-angular';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AddComponent,
    ViewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxPaginationModule
  ]
})
export class PostModule { }
