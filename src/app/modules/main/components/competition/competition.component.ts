import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter, MdSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/laravel/crud.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  @ViewChild('cityDateEndInput') cityDateEndInput; 
  @ViewChild('cityDateStartInput') cityDateStartInput; 
  @ViewChild('cityNameInput') cityNameInput; 

  cityCounting: any = [];
  cityObject: any = [];
  competitionForm: FormGroup;
  mask: any = {
    time: [/\d/, /\d/, ':', /\d/, /\d/],
    date: [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /[1-2]/, /\d/, /\d/, /\d/]
  };
  paramsToTableData: any;
  title: string = "Nova Competição";
  updatedCity: any;

  /*update properties no change start*/
  paramToSearch: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
  /*update properties no change end*/

  /*update properties specific start*/
  hasCountDownTimer: boolean = false;
  hasMultipleTeams: boolean = false;
  /*update properties specific end*/
  
  constructor(
    dateAdapter: DateAdapter<NativeDateAdapter>,
    private crud: CrudService,
    private mdsnackbar: MdSnackBar,
    private route: ActivatedRoute
  ) {
    dateAdapter.setLocale('pt-BR');
  }

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
          route: 'competitions',
          order: ['id', 'desc'],
          search: [{
            where: 'id',
            value: this.paramToSearch.replace(':', '')
          }]
        }).then(res => {
          console.log(res);
          let obj = res['obj'][0];

          this.competitionForm.get('name').setValue(obj.name);

          if(obj.hasCountDownTimer == 1) {
            this.hasCountDownTimer = true;
          } else { 
            this.hasCountDownTimer = false;
          }

          if(obj.hasMultipleTeams == 1) {
            this.hasMultipleTeams = true;
          } else { 
            this.hasMultipleTeams = false;
          }
        })
      } else {
        this.submitToCreate = true;
        this.submitToUpdate = false;
        this.title = "Nova Área Tecnológica";
        this.submitButton = "Salvar";
      }
    })
    /*update end*/

    this.route.params.subscribe(params => {
      this.competitionForm = new FormGroup({
        'hosts': new FormArray([]),
        'endDate': new FormControl(null),
        'initialDate': new FormControl(null),
        'host_name': new FormControl(null),
        'name': new FormControl(null, Validators.required),
        'hasCountDownTimer': new FormControl(false),
        'hasMultipleTeams': new FormControl(false)
      });
    })

    this.makeList();
  }

  clearSetTimeout = (element) => {
    clearTimeout(element);
  }

  onAddCity = () => {
    let backgroundColor;
    let mdDatePickerId1 = this.competitionForm.get('hosts').value.length + "id1";
    let mdDatePickerId2 = this.competitionForm.get('hosts').value.length + "id2";

    if((this.competitionForm.get('hosts').value.length % 2 == 0)) {
      backgroundColor = '#cfd8dc';
    } else {
      backgroundColor = '#fff';
    }

    let control = new FormGroup({
      'host_name': new FormControl(this.competitionForm.get('host_name').value),
      'endDate': new FormControl(this.competitionForm.get('endDate').value), 
      'initialDate': new FormControl(this.competitionForm.get('initialDate').value),
      '_backgroundColor': new FormControl(backgroundColor),
      '_mdDatePickerId1': new FormControl(mdDatePickerId1),
      '_mdDatePickerId2': new FormControl(mdDatePickerId2)
    });
    
    (<FormArray>this.competitionForm.get('hosts')).push(control);

    this.competitionForm.get('host_name').setValue(null);
    this.competitionForm.get('initialDate').setValue(null);
    this.competitionForm.get('endDate').setValue(null);
  }

  onAllowMultipleTeams = (event) => {
    this.competitionForm.get('hasMultipleTeams').setValue(event.checked);
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de competições",
        delete: "id",
        search: true
      },
      list: {
        route: "competitions",
        show: ['name'],
        header: ['Nome'],
        order: ['name', 'asc'],
        edit: {route: '/main/competition/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    }
  }

  onCompetitionSubmit = () => {
    delete this.competitionForm.value.host_name;
    delete this.competitionForm.value.initialDate;
    delete this.competitionForm.value.endDate;

    for(let lim = this.competitionForm.value.hosts.length, i = 0; i < lim; i++) {
      delete this.competitionForm.value.hosts[i]._backgroundColor;
      delete this.competitionForm.value.hosts[i]._mdDatePickerId1;
      delete this.competitionForm.value.hosts[i]._mdDatePickerId2;
    }

    let params = {
      route: 'competitions',
      objectToCreate: this.competitionForm.value
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

      this.competitionForm.get('hosts').setValue([]);
      this.competitionForm.reset();
    })

    this.makeList();
  }

  onEnableCountDown = (event) => {
    this.competitionForm.get('hasCountDownTimer').setValue(event.checked);
  }

  onRemoveCity = (index) => {
    const control = <FormArray>this.competitionForm.controls['hosts'];
    control.removeAt(index);

    for(let lim = this.competitionForm.get('hosts').value.length, i =0; i < lim; i++) {
      if((i % 2 == 0)) {
        control.controls[i].patchValue({_backgroundColor: '#cfd8dc'})
      } else {
        control.controls[i].patchValue({_backgroundColor: '#fff'})
      }
    }
  }

  onUpdateCity = (index) => {
    this.clearSetTimeout(this.updatedCity);

    this.updatedCity = setTimeout(() => {
      this.cityObject[index].host_name = this.cityNameInput.nativeElement.value;
      this.cityObject[index].endDate = this.cityDateEndInput.nativeElement.value;
      this.cityObject[index].initialDate = this.cityDateStartInput.nativeElement.value;
    }, 500);
  }
}
