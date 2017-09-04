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
    time: [/\d/, /\d/, ':', /\d/, /\d/]
  };
  
  constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.competitionForm = new FormGroup({
      'dates': new FormArray([])
    })
  }

  handleScheduleOutput = (event) => {
    console.log(event);
  }

  onAddSchedule = () => {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.competitionForm.get('dates')).push(control);
  }

  onCompetitionSubmit = () => {
    console.log(32);
    console.log(this.competitionForm);
  }

  onRemoveSchedule = (index) => {
    (<FormArray>this.competitionForm.get('dates')).removeAt(index);
  }
}
