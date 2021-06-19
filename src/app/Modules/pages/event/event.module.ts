import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CKEditorModule } from 'ckeditor4-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class EventModule { }
