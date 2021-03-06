import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/laravel/crud.service';

@Component({
  selector: 'app-profile-group',
  templateUrl: './profile-group.component.html',
  styleUrls: ['./profile-group.component.css']
})
export class ProfileGroupComponent implements OnInit {
  array: any;
  profileGroupForm: FormGroup;
  paramToSearch: any;
  paramsToTableData: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
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
        this.title = "Alterar Dados de Grupo de Perfil";
        this.submitButton = "Atualizar";

        this.crud.read({
          route: 'profiles-groups',
          order: ['id', 'desc'],
          search: [{
            where: 'id',
            value: this.paramToSearch.replace(':', '')
          }]
        }).then(res => {
          
          let obj = res['obj'][0];

          this.profileGroupForm.get('group_profile_name').setValue(obj.group_profile_name);
        })
      } else {
        this.submitToCreate = true;
        this.submitToUpdate = false;
        this.title = "Novo Grupo de Perfil";
        this.submitButton = "Salvar";
      }
    })
    /*update end*/

    this.profileGroupForm = new FormGroup({
      'competition_id': new FormControl(1),
      'group_profile_name': new FormControl(null,[Validators.maxLength(191),Validators.required])
    });

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de grupos de perfis",
        delete: [{
          route: '/main/profile-group',
          param: 'id'
        }],
        search: true
      },
      list: {
        route: "profiles-groups",
        show: ['group_profile_name'],
        header: ['Grupo de Perfil'],
        order: ['id', 'desc'],
        edit: {route: '/main/profile-group/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }
  
  onProfileGroupSubmit = () => {
    if(this.submitToUpdate) {
      let params = {
        route: 'profiles-groups',
        objectToUpdate: this.profileGroupForm.value,
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
  
      this.router.navigate(['/main/profile-group']);
    } else {
      let params = {
        route: 'profiles-groups',
        objectToCreate: this.profileGroupForm.value
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

      this.profileGroupForm.get('group_profile_name').setValue(null);

      this.makeList();
    }
  }
}
