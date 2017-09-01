import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

/**
 * Guards
 */
import { AuthGuard } from './guards/auth.guard';

/**
 * Modules
 */
import { TextMaskModule } from 'angular2-text-mask';

/**
 * Services
 */
import { AuthenticationService } from './services/laravel/authentication.service';
import { CrudService } from './services/laravel/crud.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TextMaskModule,
    ReactiveFormsModule
  ],
  exports:[
    LoginComponent,
    LogoutComponent,
    MaterialModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MenuSidenavComponent,
    TableDataComponent,
    ScheduleComponent
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    MenuSidenavComponent,
    TableDataComponent,
    ScheduleComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    CrudService
  ]
})
export class SharedModule { }
