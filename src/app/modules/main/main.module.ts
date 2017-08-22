import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
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
