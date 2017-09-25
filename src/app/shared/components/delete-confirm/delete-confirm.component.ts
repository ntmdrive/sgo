import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

/*Services*/
import { CrudService } from './../../services/laravel/crud.service';

@Component({
  selector: 'ntm-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})

export class DeleteConfirmComponent implements OnInit {
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  dataToDelete: any;
  
  constructor(
    public dialogRef: MdDialogRef<DeleteConfirmComponent>,
    private crud: CrudService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
  }
   
  delete() {
    this.crud
    .delete({
      route: this.data.route,
      paramToDelete: this.data.paramToDelete
    })
    .then(() => {
      console.log('dc-01 - Delete successful')
      this.change.emit('Shit done');
    });
    
    this.dialogRef.close();
  }
}
