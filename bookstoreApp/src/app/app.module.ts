import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './Components/book/book.component';
import { BookstoreComponent } from './Components/content/bookstore/bookstore.component';
import { BookProvider } from './Services/BookProvider';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { ContentComponent } from './Components/content/content.component';
import { CartComponent } from './Components/content/cart/cart.component';
import { UserplaceComponent } from './Components/userplace/userplace.component';
import { HttpClientModule } from '@angular/common/http';
import { BookInCartComponent } from './Components/bookInCart/bookInCart.component';
import { BuyButtonComponent } from './Components/buyButton/buyButton.component';
import { CartService } from './Services/CartService';
import { AuthorizationComponent } from './Authorization/authorization.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerService } from './Services/CustomerService';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookstoreComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent,
    CartComponent,
    UserplaceComponent,
    BookInCartComponent,
    BuyButtonComponent,
    AuthorizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule
  ],
  providers: [BookProvider, CartService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
