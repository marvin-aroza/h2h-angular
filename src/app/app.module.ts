import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Required Modules
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

//Components

//Custom Modules
import { SharedModule } from 'src/app/shared/shared.module'

//Pipes

//Interceptors
import { BasicAuthInterceptor} from  'src/app/shared/Interceptors/basic-auth.interceptor'
import { ErrorInterceptor } from 'src/app/shared/Interceptors/error.interceptor'

//Services
import { AuthService } from 'src/app/shared/Services/auth.service'

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
    SharedModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
