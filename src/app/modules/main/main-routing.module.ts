import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { MainComponent } from './main.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [{
  path: '', component: MainComponent, children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    { path: 'home', component: HomeComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
