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

  onAddSchedule() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.competitionForm.get('dates')).push(control);
  }

  onRemoveSchedule(index) {
    (<FormArray>this.competitionForm.get('dates')).removeAt(index);
  }
}
