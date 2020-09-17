import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GeneratorModule } from './generator/generator.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GeneratorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
