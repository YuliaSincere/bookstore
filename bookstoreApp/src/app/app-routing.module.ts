import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationComponent } from './Authorization/authorization.component';
import { ContentComponent } from './Components/content/content.component';
import { OrderComponent } from './Components/order/order.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';


const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'bookstore', component: ContentComponent },
  { path: 'order', component: OrderComponent },
  { path: '**', component: AuthorizationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
