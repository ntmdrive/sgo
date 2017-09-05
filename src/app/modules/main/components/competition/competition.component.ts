import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter, MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  competitionForm: FormGroup;
  mask: any = {
    time: [/\d/, /\d/, ':', /\d/, /\d/],
    date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };
  paramsToTableData: any;
  
  constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.competitionForm = new FormGroup({
      'competitionName': new FormControl(null, Validators.required),
      'dateStart': new FormControl(null, Validators.required),
      'dateEnd': new FormControl(null, Validators.required),
      'countDown': new FormControl(false),
      'multipleTeamsOverOccupation': new FormControl(false),
      'cities': new FormArray([])
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
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.competitionForm.get('cities')).push(control);
  }

  onCompetitionSubmit = () => {
    console.log(this.competitionForm.value);
  }

  onEnableCountDown = (event) => {
    this.competitionForm.get('countDown').setValue(event.checked);
  }

  onAllowMultipleTeams = (event) => {
    this.competitionForm.get('multipleTeamsOverOccupation').setValue(event.checked);
  }

  onRemoveCity = (index) => {
    (<FormArray>this.competitionForm.get('cities')).removeAt(index);
  }
}
