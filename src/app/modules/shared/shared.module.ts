import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizationGuardService } from './services/authorization-guard-service';
import { GridPaginationComponent } from './components/grid-pagination/grid-pagination.component';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UiSwitchModule,
    ReactiveFormsModule,
    NgHttpLoaderModule,
    FormsModule,
    NgbModule
  ],
  providers: [AuthorizationGuardService],
  declarations: [LayoutComponent, HeaderComponent, GridPaginationComponent],
  exports:[GridPaginationComponent]
})
export class SharedModule { }
