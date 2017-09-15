import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  paramsToMenuSideNav: any;
  title: string = "SGO";

  constructor() { }

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
  }
}
