import { Component, OnInit } from '@angular/core';

/**
 * Services
 */
import { CrudService } from './../../shared/services/laravel/crud.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  competitionsObject: any;
  paramsToMenuSideNav: any;
  title: string = "SGO";

  constructor(
    private crud: CrudService
  ) { }

  ngOnInit() {
    this.paramsToMenuSideNav = {
      menuSettings: [{
        description: "Competições",
        route: ['/main/competition']
      }, {
        description: "Delegações",
        route: ['/main/delegation']
      }, {
        description: "Grupos de Ocupações",
        route: ['/main/occupation-group']
      }, {
        description: "Instituições",
        route: ['/main/institution']
      }, {
        description: "Ocupações",
        route: ['/main/occupation']
      }]
    }

    this.setCompetitionsObject();
  }

  setCompetitionsObject = () => {
    let params = {
      route: 'competitions',
      order: ['name', 'asc']
    };

    this.crud.read(params)
    .then(res => {
      console.log(res);
      this.competitionsObject = res['obj'];
    })
  }
}
