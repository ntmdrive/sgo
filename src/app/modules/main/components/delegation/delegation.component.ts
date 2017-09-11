import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/laravel/crud.service';

@Component({
  selector: 'app-delegation',
  templateUrl: './delegation.component.html',
  styleUrls: ['./delegation.component.css']
})
export class DelegationComponent implements OnInit {
  array: any;
  delegationForm: FormGroup;
  paramsToTableData: any;

  constructor(
    private crud: CrudService
  ) { }

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
        route: "delegations",
        show: ['delegation_name', "initials"],
        header: ['Delegação', 'Iniciais'],
        order: ['delegation_name', 'asc'],
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
    let params = {
      route: 'delegations',
      objectToCreate: this.delegationForm.value
    };
    this.crud.create(params)
    console.log(this.delegationForm.value);
  }
}
