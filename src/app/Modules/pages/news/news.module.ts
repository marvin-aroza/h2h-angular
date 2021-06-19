import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CKEditorModule } from 'ckeditor4-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit/edit.component'

import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AddComponent,
    ViewComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class NewsModule { }
