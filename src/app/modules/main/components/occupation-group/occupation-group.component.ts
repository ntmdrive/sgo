import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

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
  occupationsGroupsForm: FormGroup;
  paramsToTableData: any;

  constructor(
    private crud: CrudService,
    private mdsnackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.occupationsGroupsForm = new FormGroup({
      'competition_id': new FormControl(1),
      'occupation_group_name': new FormControl(null)
    });

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de grupos de ocupações",
        delete: "id",
        search: true
      },
      list: {
        route: "occupations-groups",
        show: ['occupation_group_name'],
        header: ['Grupo de ocupação'],
        order: ['id', 'desc'],
        edit: {route: '/main/occupation-group/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }

  onChangeForeignDelegation = (events) => {
    this.occupationsGroupsForm.get('foreignDelegation').setValue(events.checked);
  }

  onOccupationsGroupsSubmit = () => {
    let params = {
      route: 'occupations-groups',
      objectToCreate: this.occupationsGroupsForm.value
    };
    
    this.crud.create(params)
    .then(res => {
      this.mdsnackbar.open(res['message'], '', {
        duration: 2000
      })
    }, rej => {
      this.mdsnackbar.open(rej['message'], '', {
        duration: 3000
      })
    })

    this.occupationsGroupsForm.get('occupation_group_name').setValue(null);

    this.makeList();
  }
}
