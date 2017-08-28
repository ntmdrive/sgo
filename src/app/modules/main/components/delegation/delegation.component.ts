import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delegation',
  templateUrl: './delegation.component.html',
  styleUrls: ['./delegation.component.css']
})
export class DelegationComponent implements OnInit {
  array: any;
  paramsToTableData: any;

  constructor() { }

  ngOnInit() {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de delegações"
      },
      list: {
        route: "users",
        show: ['name', "cpf_number"],
        header: ['Nome', 'CPF'],
        colorByData: [{field: 'unit_id', fieldValue: '13', backgroundColor: '#3f51b5', color: '#fff'}]
      },
      actionToolbar: {

      }
    }
  }
}
