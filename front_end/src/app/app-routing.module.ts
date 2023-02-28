import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CategoriesComponent } from './categories/categories.component';
import { ConnectionComponent } from './connection/connection.component';
import { HomeComponent } from './home/home.component';
import { TodayComponent } from './today/today.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'today', component: TodayComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'account', component: AccountComponent},
  {path: 'connection', component: ConnectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
