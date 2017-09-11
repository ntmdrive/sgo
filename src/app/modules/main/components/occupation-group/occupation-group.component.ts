import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/laravel/crud.service';

@Component({
  selector: 'app-occupation-group',
  templateUrl: './occupation-group.component.html',
  styleUrls: ['./occupation-group.component.css']
})
export class OccupationGroupComponent implements OnInit {
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
        route: "occupations-groups",
        show: ['occupation_group_name'],
        header: ['Grupo de ocupação'],
        order: ['occupation_group_name', 'asc'],
        edit: {route: '/main/occupation-group/', param: 'id'},
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
      route: 'occupations-groups',
      objectToCreate: this.delegationForm.value
    };
    this.crud.create(params)
    console.log(this.delegationForm.value);
  }
}
