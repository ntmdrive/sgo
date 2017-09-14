import { ActivatedRoute, Router } from '@angular/router';
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
  hostToSelect: any;
  occupationForm: FormGroup;
  occupationGroupToSelect: any;
  institutionToSelect: any;
  paramToSearch: any;
  paramsToTableData: any;
  submitButton: string;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  title: string;

  constructor(
    private crud: CrudService,
    private mdsnackbar: MdSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    /*update start*/
    this.route.params.subscribe(params => {
      if(params.id) {
        this.paramToSearch = params.id;
        this.submitToCreate = false;
        this.submitToUpdate = true;
        this.title = "Alterar Dados de Ocupação";
        this.submitButton = "Atualizar";

        this.crud.read({
          route: 'occupations',
          order: ['id', 'desc'],
          search: [{
            where: 'id',
            value: this.paramToSearch.replace(':', '')
          }]
        }).then(res => {
          
          let obj = res['obj'][0];

          this.occupationForm.get('occupation_name').setValue(obj.occupation_name);

          this.occupationForm.get('occupation_name').setValue(obj.occupation_name);
          this.occupationForm.get('occupation_number').setValue(obj.occupation_number);
          this.occupationForm.get('number_participants').setValue(obj.number_participants);
          this.occupationForm.get('age_limit').setValue(obj.age_limit);
          this.occupationForm.get('occupation_group_id').setValue(obj.occupation_group_id, {selected: true});
          //this.occupationForm.get('group_code_forum').setValue(obj.group_code_forum);
          this.occupationForm.get('nickname').setValue(obj.nickname);
          this.occupationForm.get('is_demonstration').setValue(obj.is_demonstration);
          this.occupationForm.get('is_disability').setValue(obj.is_disability);
          this.occupationForm.get('host_id').setValue(obj.host_id, {selected: true});
          this.occupationForm.get('institution_id').setValue(obj.institution_id, {selected: true});
        })
      } else {
        this.submitToCreate = true;
        this.submitToUpdate = false;
        this.title = "Nova Ocupação";
        this.submitButton = "Salvar";
      }
    })
    /*update end*/

    this.crud.read({
      route: 'occupations-groups',
      show: ['id', 'occupation_group_name'],

      order: ['id', 'desc']
    })
    .then(res => {
      this.occupationGroupToSelect = res['obj'];
    });

    this.crud.read({
      route: 'hosts',
      show: ['id', 'host_name'],

      order: ['host_name', 'asc']
    })
    .then(res => {
      this.hostToSelect = res['obj'];
    });

    this.crud.read({
      route: 'institutions',
      show: ['id', 'institution_name'],
      order: ['institution_name', 'asc']
    })
    .then(res => {
      this.institutionToSelect = res['obj'];
    });

    this.occupationForm = new FormGroup({
      'competition_id': new FormControl(1),
      'occupation_name': new FormControl(null),
      'occupation_number': new FormControl(null),
      'number_participants': new FormControl(null),
      'age_limit': new FormControl(null),
      'occupation_group_id': new FormControl(null),
      //'group_code_forum': new FormControl(null),
      'nickname': new FormControl(null),
      'is_demonstration': new FormControl(false),
      'is_disability': new FormControl(false),
      'host_id': new FormControl(null),
      'institution_id': new FormControl(null)
    });

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de ocupações",
        delete: "id",
        search: true
      },
      list: {
        route: "occupations",
        show: ['occupation_name'],
        header: ['Ocupação'],
        order: ['id', 'desc'],
        edit: {route: '/main/occupation/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }

  onChangeDemonstrationOccupation = (event) => {
    this.occupationForm.get('is_demonstration').setValue(event.checked);
  }

  onChangePCDOccupation = (event) => {
    this.occupationForm.get('is_disability').setValue(event.checked);
  }
  
  onOccupationSubmit = () => {
    if(this.submitToUpdate) {
      let params = {
        route: 'occupations',
        objectToUpdate: this.occupationForm.value,
        paramToUpdate: this.paramToSearch.replace(':', '')
      };
  
      this.crud.update(params)
      .then(res => {
        this.mdsnackbar.open(res['message'], '', {
          duration: 2000
        })
      }, rej => {
        this.mdsnackbar.open(rej['message'], '', {
          duration: 3000
        })
      })
  
      this.router.navigate(['/main/occupation']);
    } else {
      let params = {
        route: 'occupations',
        objectToCreate: this.occupationForm.value
      };

      this.crud.create(params)
      .then(res => {
        this.makeList();

        this.mdsnackbar.open(res['message'], '', {
          duration: 2000
        })
      }, rej => {
        this.mdsnackbar.open(rej['message'], '', {
          duration: 3000
        })
      })

      this.occupationForm.get('competition_id').setValue(null);
      this.occupationForm.get('occupation_name').setValue(null);
      this.occupationForm.get('occupation_number').setValue(null);
      this.occupationForm.get('number_participants').setValue(null);
      this.occupationForm.get('age_limit').setValue(null);
      this.occupationForm.get('occupation_group_id').setValue(null);
      //this.occupationForm.get('group_code_forum').setValue(null);
      this.occupationForm.get('nickname').setValue(null);
      this.occupationForm.get('is_demonstration').setValue(null);
      this.occupationForm.get('is_disability').setValue(null);
      this.occupationForm.get('host_id').setValue(null);
      this.occupationForm.get('institution_id').setValue(null);
    }
  }
}
