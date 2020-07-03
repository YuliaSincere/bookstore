import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationComponent } from './Authorization/authorization.component';
import { ContentComponent } from './Components/content/content.component';


const routes: Routes = [
    { path: 'bookstore', component: ContentComponent },
    { path: '**', component: AuthorizationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
