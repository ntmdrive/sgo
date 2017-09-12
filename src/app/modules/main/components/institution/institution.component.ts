import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/laravel/crud.service';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent implements OnInit {
  array: any;
  institutionForm: FormGroup;
  paramsToTableData: any;

  constructor(
    private crud: CrudService,
    private mdsnackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.institutionForm = new FormGroup({
      'competition_id': new FormControl(1),
      'institution_name': new FormControl(null)
    });

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de instituições",
        delete: "id",
        search: true
      },
      list: {
        route: "institutions",
        show: ['institution_name'],
        header: ['Grupo de ocupação'],
        order: ['id', 'desc'],
        edit: {route: '/main/institution/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }

  onChangeForeignDelegation = (events) => {
    this.institutionForm.get('foreignDelegation').setValue(events.checked);
  }

  onInstitutionSubmit = () => {
    console.log(this.institutionForm.value);
    let params = {
      route: 'institutions',
      objectToCreate: this.institutionForm.value
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

    this.institutionForm.get('institution_name').setValue(null);

    this.makeList();
  }
}
