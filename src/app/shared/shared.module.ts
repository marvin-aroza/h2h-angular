import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';

//Pipes
import { LoopLimiterPipe } from './Pipes/loop-limiter.pipe';
import { NotificationNumberLimiterPipe } from './Pipes/notification-number-limiter.pipe';
import { ErrorComponent } from './Components/error/error.component';
import { DefualtImagePipe } from './Pipes/defualt-image.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoopLimiterPipe,
    NotificationNumberLimiterPipe,
    ErrorComponent,
    DefualtImagePipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    HeaderComponent,
    LoopLimiterPipe,
    NotificationNumberLimiterPipe,
    DefualtImagePipe
  ]
})
export class SharedModule { }
