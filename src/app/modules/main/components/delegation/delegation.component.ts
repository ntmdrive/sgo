import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

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
  isForeign: boolean = false;
  paramsToTableData: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  title: string;

  constructor(
    private crud: CrudService,
    private mdsnackbar: MdSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params.id) {
        let paramToSearch = params.id;

        this.title = "Alterar Dados de Delegação";

        this.crud.read({
          route: 'delegations',
          order: ['id', 'desc'],
          search: [{
            where: 'id',
            value: paramToSearch.replace(':', '')
          }]
        }).then(res => {
          
          let obj = res['obj'][0];
          console.log(obj);
          this.delegationForm.get('initials').setValue(obj.initials);
          this.delegationForm.get('delegation_name').setValue(obj.delegation_name);
          
          if(obj.is_foreign == 1) {
            this.isForeign = true;
          } else { 
            this.isForeign = false;
          }
        })
      } else {
        this.title = "Nova Delegação";
      }
    })

    this.route.params.subscribe(params => {
      if(params.id) {
        this.title = "Alterar Dados de Delegação";
        this.submitToCreate = false;
        this.submitToUpdate = true;
      } else {
        this.title = "Nova Delegação";
        this.submitToCreate = true;
        this.submitToUpdate = false;
      }
    })

    this.delegationForm = new FormGroup({
      'competition_id': new FormControl(1),
      'initials': new FormControl(null),
      'delegation_name': new FormControl(null),
      'is_foreign': new FormControl(false)
    });

    this.paramsToTableData = {
      toolbar: {
        title: "Lista de delegações",
        delete: "id",
        search: true
      },
      list: {
        route: "delegations",
        show: ['delegation_name', 'initials'],
        header: ['Delegação', 'Iniciais'],
        order: ['id', 'desc'],
        edit: {route: '/main/delegation/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }

  handleTableDataOutput(e) {
    
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de delegações",
        delete: "id",
        search: true
      },
      list: {
        route: "delegations",
        show: ['delegation_name', 'initials'],
        header: ['Delegação', 'Iniciais'],
        order: ['id', 'desc'],
        edit: {route: '/main/delegation/', param: 'id'},
        source: true
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

  onDelegationUpdate = () => {
    let params = {
      route: 'delegations',
      objectToUpdate: this.delegationForm.value
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
