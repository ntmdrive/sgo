import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter, MdSnackBar } from '@angular/material';

@Component({
  selector: 'ntm-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() params;

  chooseSortOfDate: boolean = false;
  errors: any = [];
  mask: any = {
    time: [/\d/, /\d/, ':', /\d/, /\d/]
  };
  placeholderToDatepicker: string;
  scheduleForm: FormGroup;
  
  constructor(private dateAdapter: DateAdapter<NativeDateAdapter>) {}

  ngOnInit() {
    this.scheduleForm = new FormGroup({
      'dates': new FormArray([]),
      'intervals': new FormArray([])
    })

    if(this.params) {
      if(!this.params.language) {
        this.params.language = "pt-BR";
      }
  
      if(this.params.language == "pt-BR") {
        this.placeholderToDatepicker = "Escolha uma data";
      }

      this.dateAdapter.setLocale(this.params.language);
    } else {
      this.errors.push({
        cod: "p-01",
        message: "Definir parâmetros mínimos do componente"
      })
    }
  }

  onAddDate = () => {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.scheduleForm.get('dates')).push(control);
  }

  onAddInterval = () => {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.scheduleForm.get('intervals')).push(control);
  }

  onNewSchedule = () => {
    this.chooseSortOfDate = !this.chooseSortOfDate;
  }

  onRemoveSchedule = (index) => {
    (<FormArray>this.scheduleForm.get('dates')).removeAt(index);
  }
}
