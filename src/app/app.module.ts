import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverlapComponent } from './rectangle/overlap/overlap.component';
import { FormsModule } from '@angular/forms';
import { RectangleService } from './core/services/rectangle.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OverlapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RectangleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
