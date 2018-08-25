import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: 'list',
    component: UsersListComponent,
  },
  {
    path: 'view/:userId',
    component: UserDetailsComponent
  },
  {
    path: 'edit/:userId',
    component: UserEditComponent
  },
  {
    path: '',
    redirectTo: 'list'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
