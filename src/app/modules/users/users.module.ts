import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UsersGridComponent } from './components/users-grid/users-grid.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [UsersListComponent, UserDetailsComponent, UsersGridComponent, UserEditComponent, UserFormComponent]
})
export class UsersModule { }
