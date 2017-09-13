import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { CompetitionComponent } from './components/competition/competition.component';
import { DelegationComponent } from './components/delegation/delegation.component';
import { HomeComponent } from './components/home/home.component';
import { InstitutionComponent } from './components/institution/institution.component';
import { MainComponent } from './main.component';
import { OccupationComponent } from './components/occupation/occupation.component';
import { OccupationGroupComponent } from './components/occupation-group/occupation-group.component';

const routes: Routes = [{
  path: '', component: MainComponent, children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }, { 
      path: 'home', 
      component: HomeComponent 
    }, {
      path: 'competition',
      component: CompetitionComponent
    }, {
      path: 'competition/:id',
      component: CompetitionComponent
    }, {
      path: 'delegation',
      component: DelegationComponent
    }, {
      path: 'delegation/:id',
      component: DelegationComponent
    }, {
      path: 'occupation-group',
      component: OccupationGroupComponent
    }, {
      path: 'occupation-group/:id',
      component: OccupationGroupComponent
    }, {
      path: 'institution',
      component: InstitutionComponent
    }, {
      path: 'occupation',
      component: OccupationComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
