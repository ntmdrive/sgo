import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/laravel/crud.service';

@Component({
  selector: 'app-participartion-profile',
  templateUrl: './participartion-profile.component.html',
  styleUrls: ['./participartion-profile.component.css']
})
export class ParticipartionProfileComponent implements OnInit {
  array: any;
  participationProfileForm: FormGroup;
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
        this.title = "Alterar Dados de Perfil de Participação";
        this.submitButton = "Atualizar";

        this.crud.read({
          route: 'profiles',
          order: ['id', 'desc'],
          search: [{
            where: 'id',
            value: this.paramToSearch.replace(':', '')
          }]
        }).then(res => {
          
          let obj = res['obj'][0];

          this.participationProfileForm.get('profile_name').setValue(obj.profile_name);
        })
      } else {
        this.submitToCreate = true;
        this.submitToUpdate = false;
        this.title = "Nova Perfil de Participação";
        this.submitButton = "Salvar";
      }
    })
    /*update end*/

    this.participationProfileForm = new FormGroup({
      'competition_id': new FormControl(1),
      'profile_name': new FormControl(null)
    });

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de perfis de participantes",
        delete: [{
          route: '/main/participation-profile',
          param: 'id'
        }],
        search: true
      },
      list: {
        route: "profiles",
        show: ['profile_name'],
        header: ['Perfil de Participação'],
        order: ['id', 'desc'],
        edit: {route: '/main/participation-profile/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }
  
  onParticipationProfileSubmit = () => {
    if(this.submitToUpdate) {
      let params = {
        route: 'profiles',
        objectToUpdate: this.participationProfileForm.value,
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
  
      this.router.navigate(['/main/participation-profile']);
    } else {
      let params = {
        route: 'profiles',
        objectToCreate: this.participationProfileForm.value
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

      this.participationProfileForm.get('profile_name').setValue(null);

      this.makeList();
    }
  }
}
