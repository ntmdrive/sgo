import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

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
  title: string;

  /*update properties no change start*/
  paramToSearch: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
  /*update properties no change end*/

  /*update properties specific start*/
  isForeign: boolean = false;
  /*update properties specific end*/

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
        this.title = "Alterar Dados de Delegação";
        this.submitButton = "Atualizar";

        this.crud.read({
          route: 'delegations',
          order: ['id', 'desc'],
          search: [{
            where: 'id',
            value: this.paramToSearch.replace(':', '')
          }],
          page: 1
        }).then(res => {
          
          let obj = res['obj'][0];
          
          this.delegationForm.get('initials').setValue(obj.initials);
          this.delegationForm.get('delegation_name').setValue(obj.delegation_name);
          
          if(obj.is_foreign == 1) {
            this.isForeign = true;
          } else { 
            this.isForeign = false;
          }
          this.delegationForm.get('is_foreign').setValue(this.isForeign);
        })
      } else {
        this.submitToCreate = true;
        this.submitToUpdate = false;
        this.title = "Nova Delegação";
        this.submitButton = "Salvar";
      }
    })
    /*update end*/

    this.delegationForm = new FormGroup({
      'competition_id': new FormControl(1),
      'initials': new FormControl(null,[Validators.maxLength(5),Validators.required]),
      'delegation_name': new FormControl(null,[Validators.maxLength(191),Validators.required]),
      'is_foreign': new FormControl(false)
    });

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de delegações",
        delete: [{
          route: '/main/delegation',
          param: 'id'
        }],
        search: true
      },
      list: {
        route: "delegations",
        show: ['initials', 'delegation_name', 'is_foreign'],
        header: ['Sigla', 'Delegação', 'Delegação Estrangeira'],
        order: ['id', 'desc'],
        edit: {route: '/main/delegation/', param: 'id'},
        page: 1,
        source: true,
        changeValue: [{
          field: 'is_foreign',
          fieldValue: 0,
          newValue: 'Não'
        }, {
          field: 'is_foreign',
          fieldValue: 1,
          newValue: 'Sim'
        }]
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }

  onChangeForeignDelegation = (events) => {
    this.delegationForm.get('is_foreign').setValue(events.checked);
  }

  onDelegationSubmit = () => {
    if(this.submitToUpdate) {
      let params = {
        route: 'delegations',
        objectToUpdate: this.delegationForm.value,
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
      
      this.router.navigate(['/main/delegation']);
    } else {
      let params = {
        route: 'delegations',
        objectToCreate: this.delegationForm.value
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

      this.delegationForm.get('initials').setValue(null);
      this.delegationForm.get('delegation_name').setValue(null);
      this.delegationForm.get('is_foreign').setValue(false);

      this.makeList();
    }
  }
}
