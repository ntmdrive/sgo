import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

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
  title: string;
  /*update properties no change start*/
  paramToSearch: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
  /*update properties no change end*/

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
        this.title = "Alterar Dados de Área Tecnológica";
        this.submitButton = "Atualizar";

        this.crud.read({
          route: 'occupations-groups',
          order: ['id', 'desc'],
          where: [{
            where: 'id',
            value: this.paramToSearch.replace(':', '')
          }]
        }).then(res => {
          
          let obj = res['obj'][0];

          this.occupationsGroupsForm.get('occupation_group_name').setValue(obj.occupation_group_name);
        })
      } else {
        this.submitToCreate = true;
        this.submitToUpdate = false;
        this.title = "Nova Área Tecnológica";
        this.submitButton = "Salvar";
      }
    })
    /*update end*/

    this.occupationsGroupsForm = new FormGroup({
      'competition_id': new FormControl(1),
      'occupation_group_name': new FormControl(null)
    });

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de áreas tecnológicas",
        delete: [{
          route: '/main/occupation-group',
          param: 'id'
        }],
        search: true
      },
      list: {
        route: "occupations-groups",
        show: ['occupation_group_name'],
        header: ['Área tecnológica'],
        order: ['id', 'desc'],
        edit: {route: '/main/occupation-group/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }
  
  onOccupationsGroupsSubmit = () => {
    if(this.submitToUpdate) {
      let params = {
        route: 'occupations-groups',
        objectToUpdate: this.occupationsGroupsForm.value,
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

      this.makeList();
  
      this.router.navigate(['/main/occupation-group']);
    } else {
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
}
