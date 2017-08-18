import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ntm-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.css']
})
export class MenuSidenavComponent implements OnInit {
  @Input() params;

  errors = [];
  mdIcon: string;
  toggle: boolean = false;

  constructor() { }

  ngOnInit() {
    if(this.params) {
      if(!this.params.mdIcon) {
        this.mdIcon = "menu";
      }

      if(!this.params.menuSettings) {
        this.errors.push({
          cod: 'bm-lo-01',
          message: "Definir configuração do menu"
        });
      }
    } else {
      this.errors.push({
        cod: 'p-01',
        message: "Definir parâmetros mínimos do componente"
      });
    }
  }

  onToggle = () => {
    this.toggle = !this.toggle;
  }
}
