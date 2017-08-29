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
        title: "Lista de delegações",
        delete: "id",
        search: true
      },
      list: {
        route: "students",
        show: ['name', "cpf_number"],
        header: ['Nome', 'CPF'],
        order: ['name', 'asc'],
        colorByData: [{field: 'unit_id', fieldValue: '13', backgroundColor: '#3f51b5', color: '#fff'}],
        edit: {route: '/main/delegation/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    }
  }
}
