import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/laravel/crud.service';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.css']
})
export class OccupationComponent implements OnInit {
  array: any;
  occupationForm: FormGroup;
  occupationGroupToSelect: any;
  paramsToTableData: any;

  constructor(
    private crud: CrudService,
    private mdsnackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.crud.read({
      route: 'occupations-groups',
      show: ['id', 'occupation_group_name'],
      order: ['id', 'desc']
    })
    .then(res => {
      this.occupationGroupToSelect = res['obj'];
      console.log(this.occupationGroupToSelect);
    });

    this.occupationForm = new FormGroup({
      'competition_id': new FormControl(1),
      'occupation_name': new FormControl(null),
      'occupation_number': new FormControl(null),
      'number_paticipants': new FormControl(null),
      'age_limit': new FormControl(null),
      'occupation_group_id': new FormControl(null),
      'group_code_forum': new FormControl(null),
      'nickname': new FormControl(null),
      'is_demonstration': new FormControl(null),
      'is_disability': new FormControl(null),
      'host': new FormControl(null),
      'institution_id': new FormControl(null)
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
        route: "occupations",
        show: ['occupation_name'],
        header: ['Ocupação'],
        order: ['id', 'desc'],
        edit: {route: '/main/occupation-group/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }
  
  onOccupationSubmit = () => {
    let params = {
      route: 'occupations-groups',
      objectToCreate: this.occupationForm.value
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

    this.occupationForm.get('occupation_group_name').setValue(null);

    this.makeList();
  }
}
