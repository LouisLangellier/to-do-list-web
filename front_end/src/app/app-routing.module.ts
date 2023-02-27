import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  {path: 'sidebar', component: SideBarComponent},
  {path: 'connection', component: ConnectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
