import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileSelectDirective } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { Ng2ImgToolsModule } from 'ng2-img-tools'; // <-- import the module
import { Ng2ImgMaxModule } from 'ng2-img-max'; // <-- import the module

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    Ng2ImgToolsModule,
    Ng2ImgMaxModule,
    FormsModule,
    HttpModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
