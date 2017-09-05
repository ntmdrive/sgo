import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter, MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  cityCounting: any = [];
  cityObject: any = [];
  competitionForm: FormGroup;
  mask: any = {
    time: [/\d/, /\d/, ':', /\d/, /\d/],
    date: [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /[1-2]/, /\d/, /\d/, /\d/]
  };
  paramsToTableData: any;
  
  constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.competitionForm = new FormGroup({
      'cities': new FormControl(null),
      'cityDateEnd': new FormControl(null),
      'cityDateStart': new FormControl(null),
      'cityName': new FormControl(null),
      'competitionName': new FormControl(null, Validators.required),
      'competitionDateStart': new FormControl(null),
      'competitionDateEnd': new FormControl(null),
      'countDown': new FormControl(false),
      'multipleTeamsOverOccupation': new FormControl(false)
    })

    this.paramsToTableData = {
      toolbar: {
        title: "Lista de competições",
        delete: "id",
        search: true
      },
      list: {
        route: "students",
        show: ['name', "cpf_number"],
        header: ['Nome', 'CPF'],
        order: ['name', 'asc'],
        colorByData: [{field: 'unit_id', fieldValue: '13', backgroundColor: '#3f51b5', color: '#fff'}],
        edit: {route: '/main/delegation/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    }
  }

  onAddCity = () => {
    let index;

    this.cityObject.push({
      cityName: this.competitionForm.get('cityName').value,
      cityDateStart: this.competitionForm.get('cityDateStart').value,
      cityDateEnd: this.competitionForm.get('cityDateEnd').value
    })

    index = this.cityObject.length - 1;
    console.log(this.cityObject[index]);
    if((this.cityObject.length % 2 != 0)) {
      this.cityObject[index]._backgroundColor = '#cfd8dc';
    } else {
      this.cityObject[index]._backgroundColor = '#fff';
    }
    

    this.competitionForm.get('cityName').setValue(null);
    this.competitionForm.get('cityDateStart').setValue(null);
    this.competitionForm.get('cityDateEnd').setValue(null);
    /*const control = new FormControl(null, Validators.required);
    (<FormArray>this.competitionForm.get('cities')).push(control);*/
  }

  onCompetitionSubmit = () => {
    if(this.cityObject.length > 0) {
      this.competitionForm.get('cities').setValue(this.cityObject);
    }

    console.log(this.competitionForm.value);
  }

  onEnableCountDown = (event) => {
    this.competitionForm.get('countDown').setValue(event.checked);
  }

  onAllowMultipleTeams = (event) => {
    this.competitionForm.get('multipleTeamsOverOccupation').setValue(event.checked);
  }

  onRemoveCity = (index) => {
    this.cityObject.splice(index, 1);

    for(let lim = this.cityObject.length, i =0; i < lim; i++) {
      if((i % 2 == 0)) {
        this.cityObject[i]._backgroundColor = '#cfd8dc';
      } else {
        this.cityObject[i]._backgroundColor = '#fff';
      }
    }
  }
}
