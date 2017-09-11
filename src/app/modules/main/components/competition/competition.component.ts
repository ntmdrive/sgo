import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter, MdSnackBar } from '@angular/material';

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
  updatedCity: any;
  
  constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.competitionForm = new FormGroup({
      'cities': new FormArray([]),
      'cityDateEnd': new FormControl(null),
      'cityDateStart': new FormControl(null),
      'cityName': new FormControl(null),
      'name': new FormControl(null, Validators.required),
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
    console.log(this.competitionForm);
  }

  clearSetTimeout = (element) => {
    clearTimeout(element);
  }

  onAddCity = () => {
    let backgroundColor;
    let mdDatePickerId1 = this.competitionForm.get('cities').value.length + "id1";
    let mdDatePickerId2 = this.competitionForm.get('cities').value.length + "id2";

    if((this.competitionForm.get('cities').value.length % 2 == 0)) {
      backgroundColor = '#cfd8dc';
    } else {
      backgroundColor = '#fff';
    }

    let control = new FormGroup({
      'cityName': new FormControl(this.competitionForm.get('cityName').value),
      'cityDateEnd': new FormControl(this.competitionForm.get('cityDateEnd').value), 
      'cityDateStart': new FormControl(this.competitionForm.get('cityDateStart').value),
      '_backgroundColor': new FormControl(backgroundColor),
      '_mdDatePickerId1': new FormControl(mdDatePickerId1),
      '_mdDatePickerId2': new FormControl(mdDatePickerId2)
    });
    
    (<FormArray>this.competitionForm.get('cities')).push(control);
    console.log(this.competitionForm);

    this.competitionForm.get('cityName').setValue(null);
    this.competitionForm.get('cityDateStart').setValue(null);
    this.competitionForm.get('cityDateEnd').setValue(null);
  }

  onAllowMultipleTeams = (event) => {
    this.competitionForm.get('multipleTeamsOverOccupation').setValue(event.checked);
  }

  onCompetitionSubmit = () => {
    console.log(this.competitionForm.value);
  }

  onEnableCountDown = (event) => {
    this.competitionForm.get('countDown').setValue(event.checked);
  }

  onRemoveCity = (index) => {
    const control = <FormArray>this.competitionForm.controls['cities'];
    control.removeAt(index);

    for(let lim = this.competitionForm.get('cities').value.length, i =0; i < lim; i++) {
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
      this.cityObject[index].cityName = this.cityNameInput.nativeElement.value;
      this.cityObject[index].cityDateEnd = this.cityDateEndInput.nativeElement.value;
      this.cityObject[index].cityDateStart = this.cityDateStartInput.nativeElement.value;
    }, 500);
  }

  test(e) {
    console.log(e)
  }
}
