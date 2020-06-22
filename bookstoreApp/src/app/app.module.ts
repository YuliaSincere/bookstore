import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './Components/book/book.component';
import { BookstoreComponent } from './Components/content/bookstore/bookstore.component';
import { BookProvider } from './Services/bookprovider';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { ContentComponent } from './Components/content/content.component';
import { CartComponent } from './Components/content/cart/cart.component';
import { UserplaceComponent } from './Components/userplace/userplace.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookstoreComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent,
    CartComponent,
    UserplaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BookProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
