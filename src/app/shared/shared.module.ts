import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component';

/**
 * Guards
 */
import { AuthGuard } from './guards/auth.guard';

/**
 * Services
 */
import { AuthenticationService } from './services/laravel/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    LoginComponent,
    LogoutComponent,
    MaterialModule,
    MenuSidenavComponent
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    MenuSidenavComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuard
  ]
})
export class SharedModule { }
