import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { LandingModule } from './landing/landing.module';
import { IdentityStateService } from '../state/identity/state-service';
import { Routes, RouterModule } from '@angular/router';
import { StateModule } from '../state/state.module';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthorizationGuardService } from './shared/services/authorization-guard-service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: 'app/modules/landing/landing.module#LandingModule' },
      { path: 'users', loadChildren: 'app/modules/users/users.module#UsersModule' }
    ] 
    ,
    canActivate: [AuthorizationGuardService],
    canActivateChild: [AuthorizationGuardService],
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    StateModule
  ],
  exports: [RouterModule]
})
export class UiModuleModule { }
