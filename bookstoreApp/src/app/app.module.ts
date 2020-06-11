import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { BookProvider } from './Services/bookprovider';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookstoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BookProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
