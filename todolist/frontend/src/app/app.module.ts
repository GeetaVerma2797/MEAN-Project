import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AddHtmlPageComponents } from './add/htmlpage/htmlpage.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './add/auth/auth-interceptor.service';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularmaterialModule } from './angular-material.module';
import { AddModule } from './add/add.module';



// import { TasksService } from './add/add.service';

@NgModule({
  declarations: [
    AppComponent,
    AddHtmlPageComponents,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularmaterialModule,
    AddModule,
    ReactiveFormsModule
    
  ],
  // providers: [TasksService],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorComponent
  ]
})
export class AppModule { }
