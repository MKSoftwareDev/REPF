import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layouts/layout.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    LayoutModule,
    HttpModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
    FormsModule, 
    ReactiveFormsModule
    
  ],

  providers: [ScriptLoaderService,ReactiveFormsModule,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
