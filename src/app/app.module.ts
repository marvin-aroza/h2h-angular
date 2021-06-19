import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Required Modules
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION,
  PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

//Components

//Custom Modules
import { SharedModule } from 'src/app/shared/shared.module'

//Pipes

//Interceptors
import { BasicAuthInterceptor} from  'src/app/shared/Interceptors/basic-auth.interceptor'
import { ErrorInterceptor } from 'src/app/shared/Interceptors/error.interceptor'

//Services
import { AuthService } from 'src/app/shared/Services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxUiLoaderDemoService } from 'src/app/shared/Services/ngx-ui-loader-demo.service'

//Material modules
import { MatDialogModule } from '@angular/material/dialog'

//ngx loader config
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsType: "three-strings",
  fgsType: "three-strings",
  blur: 15,
  overlayColor: "rgb(40,40,40)",
  // bgsOpacity: 0.5,
  // bgsPosition: POSITION.bottomCenter,
  // bgsSize: 60,
  // bgsType: SPINNER.rectangleBounce,
  fgsColor: '#fa4b2a',
  // fgsPosition: POSITION.centerCenter,
  // fgsSize: 60,
  // fgsType: SPINNER.chasingDots,
  logoUrl: '../../assets/img/logo1.png',
  logoSize: 200,
  pbColor: "#fa4b2a",
  // pbDirection: PB_DIRECTION.leftToRight,
  // pbThickness: 5,
  // text: 'Welcome to ngx-ui-loader',
  // textColor: '#FFFFFF',
  // textPosition: POSITION.centerCenter
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    MatDialogModule,
    CKEditorModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
    NgxUiLoaderHttpModule,
  ],
  providers: [
    AuthService,
    NgxUiLoaderDemoService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
