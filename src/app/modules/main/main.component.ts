import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  paramsToMenuSideNav: any;

  constructor() { }

  ngOnInit() {
    this.paramsToMenuSideNav = {
      menuSettings: [{
        description: "Teste 1",
        route: ''
      }]
    }
  }
}
