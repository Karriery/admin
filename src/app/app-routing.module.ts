import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListformComponent } from './listform/listform.component';
import { CheckbookingComponent } from './checkbooking/checkbooking.component';
import { ItemComponent } from './listform/item/item.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ArchiveComponent } from './archive/archive.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: SidebarComponent,
    children: [
      {
        path: 'listform',
        component: ListformComponent,
      },
      { path: 'item', component: ItemComponent },
      { path: 'check', component: CheckbookingComponent },
      { path: 'archive', component: ArchiveComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
