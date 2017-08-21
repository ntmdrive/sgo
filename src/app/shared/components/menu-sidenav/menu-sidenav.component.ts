import { Component, Input, OnInit, trigger, transition, style, animate, state } from '@angular/core';

@Component({
  selector: 'ntm-menu-sidenav',
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('500ms', style({transform: 'translateX(100%)', 'opacity': 0}),
          )]
      )]
    )
  ],
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.css']
})
export class MenuSidenavComponent implements OnInit {
  @Input() params;

  errors = [];
  iconLeftPosition = "0px";
  iconTopPosition = "0px";
  mdIconClose: string;
  mdIconOpen: string;
  menuLeftPosition = "0px";
  menuTopPosition = "0px";
  toggle: boolean = false;

  constructor() { }

  ngOnInit() {
    if(this.params) {
      if(!this.params.mdIconOpen) {
        this.mdIconOpen = "menu";
      }

      if(!this.params.mdIconClose) {
        this.mdIconClose = "close";
      }

      if(!this.params.menuSettings) {
        this.errors.push({
          cod: 'bm-lo-01',
          message: "Definir configuração do menu ({menuSettings: [{description: string, route: string}]})"
        });
      }
    } else {
      this.errors.push({
        cod: 'p-01',
        message: "Definir parâmetros mínimos do componente"
      });
    }
  }

  onToggle = (event) => {
    this.toggle = !this.toggle;

    if(event) {
      this.iconLeftPosition = event.offsetX+"px";
      this.iconTopPosition = event.offsetY+"px";
      this.menuLeftPosition = event.offsetX+20;
      this.menuTopPosition = event.offsetY+20;
      console.log(event);
    }
  }
}
