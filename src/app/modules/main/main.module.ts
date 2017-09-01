import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Components
 */
import { CompetitionComponent } from './components/competition/competition.component';
import { DelegationComponent } from './components/delegation/delegation.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './main.component';
import { OccupationGroupComponent } from './components/occupation-group/occupation-group.component';

 /**
  * Modules
  */
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TextMaskModule
  ],
  declarations: [
    CompetitionComponent,
    DelegationComponent,
    HomeComponent,
    MainComponent,
    OccupationGroupComponent
  ]
})
export class MainModule { }
