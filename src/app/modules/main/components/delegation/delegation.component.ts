import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delegation',
  templateUrl: './delegation.component.html',
  styleUrls: ['./delegation.component.css']
})
export class DelegationComponent implements OnInit {
  array: any;
  delegationForm: FormGroup;
  paramsToTableData: any;

  constructor() { }

  ngOnInit() {
    this.delegationForm = new FormGroup({
      'initials': new FormControl(null),
      'delegationName': new FormControl(null),
      'foreignDelegation': new FormControl(false)
    });

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
    };
  }

  onChangeForeignDelegation = (events) => {
    this.delegationForm.get('foreignDelegation').setValue(events.checked);
  }

  onDelegationSubmit = () => {
    console.log(this.delegationForm.value);
  }
}
