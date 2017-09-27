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

  //Selects
  profileGroupToSelect: any;
  participationProfileToSelect: any;

  participationProfileCheckLength: boolean = false;


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
        this.title = "Novo Perfil de Participação";
        this.submitButton = "Salvar";
      }
    })
    /*update end*/

    this.participationProfileForm = new FormGroup({
      'competition_id': new FormControl(1),
      'profile_name': new FormControl(null),
      'profile_group_id': new FormControl(null),
      'show_percentage_preparation': new FormControl(false),
      'require_participant_association_occupation': new FormControl(false),
      'require_participant_association_delegation': new FormControl(false),
      'intentional_management': new FormControl(false)
    });

    //Selects start
    this.crud.read({
      route: 'profiles-groups',
      show: ['id', 'group_profile_name'],

      order: ['group_profile_name', 'asc']
    })
    .then(res => {
      this.profileGroupToSelect = res['obj'];
    });

    this.crud.read({
      route: 'profiles',
      show: ['id', 'profile_name'],

      order: ['profile_name', 'asc']
    })
    .then(res => {
      if(res['obj'].length > 0) {
        this.participationProfileCheckLength = true;
      }

      this.participationProfileToSelect = res['obj'];
    });
    //Selects End

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
  //Slide Toggle related methods start
  onChangePercentageDemonstration = (event) => {
    this.participationProfileForm.get('show_percentage_preparation').setValue(event.checked);
  }

  onChangePaticipantAssociationOccupation = (event) => {
    this.participationProfileForm.get('require_participant_association_occupation').setValue(event.checked);
  }

  onChangePaticipantAssociationDelegation = (event) => {
    this.participationProfileForm.get('require_participant_association_delegation').setValue(event.checked);
  }

  onChangeIntentionalManagement = (event) => {
    this.participationProfileForm.get('intentional_management').setValue(event.checked);
  }
  //Slide Toggle related methods end
  
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
