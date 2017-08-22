import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { CompetitionComponent } from './components/competition/competition.component';
import { DelegationComponent } from './components/delegation/delegation.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './main.component';
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
      path: 'delegation',
      component: DelegationComponent
    }, {
      path: 'occupation-group',
      component: OccupationGroupComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
