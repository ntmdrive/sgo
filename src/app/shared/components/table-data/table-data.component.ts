import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Services
 */
import { CrudService } from './../../services/laravel/crud.service';

@Component({
  selector: 'ntm-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {
  @Input() params;

  arrayHeader: any = []; 
  arrayNoFilter: any = [];
  arraySource: any = [];
  arraySourceFinal: any = [];
  arraySourceSearch: any = [];
  backgroundColor: string;
  backgroundColorIndex: number;
  checkAllController: boolean = false;
  checkAllItens: boolean = false;
  checkedItem: boolean = false;
  color: string;
  colorIndex: number;
  editRoute: string;
  error: any = [];
  isLoadingList: boolean = true;
  listController: FormGroup;
  listForm: FormGroup;
  msg: string;
  pageCurrent: number;
  pageTotal: number;
  placeholderToRowsPerPage: string;
  placeholderToPage: string;
  searchForm: FormGroup;
  searchInput: boolean = false;
  colorByData: any;
  testingThisShit: any;
  
  constructor(
    private crud: CrudService,
    private router: Router
  ) {
    this.searchForm = new FormGroup({
      'search': new FormControl(null)
    })

    this.listController = new FormGroup({
      'row': new FormControl(null)
    })

    this.listForm = new FormGroup({
      'deleteField': new FormControl(null)
    })
  }

  ngOnChanges() {
    if(this.params.list) {
      if(!this.params.list.limit) {
        this.params.list.limit = 10;
      }

      if(!this.params.list.order) {
        this.params.list.order = "";
      }

      if(this.params.list.header) {
        this.arrayHeader = this.params.list.header;
      } else {
        this.error = ['list.header']  
      }
    } else {
      setTimeout(() => {
        if(this.params.list == undefined) {
          this.error = ['list', 'time exceeded'];
        }
      }, 20000)
    }

    if(this.params.actionToolbar) {
      this.pageTotal = this.arrayNoFilter.length;
      
      if(!this.params.actionToolbar.selectedPageValue) {
        this.params.actionToolbar.selectedPageValue = 1;
      }

      if(!this.params.actionToolbar.selectedRowValue) {
        this.params.actionToolbar.selectedRowValue = 1;
      }

      if(!this.params.actionToolbar.rows) {
        this.params.actionToolbar.rows = [1, 5, 10, 15, 20];
      }

      if(!this.params.actionToolbar.page) {
        this.params.actionToolbar.page = 1;
      }

      if(!this.params.actionToolbar.language) {
        this.params.actionToolbar.language = "en";
      }

      if(this.params.actionToolbar.language == 'en') {
        this.placeholderToRowsPerPage = "Rows per page";
        this.placeholderToPage = "of"
      }

      if(this.params.actionToolbar.language == 'pt-br') {
        this.placeholderToRowsPerPage = "Linhas por página";
        this.placeholderToPage = "de"
      }
    } 

    let readParams = {
      route: this.params.list.route,
      limit: this.params.list.limit,
      order: this.params.list.order,
      page: this.params.actionToolbar.page
    }
    
    this.pageCurrent = this.params.actionToolbar.page;

    this.readData(readParams);
  }

  ngOnInit() { 
  }
  //Over delete
  checkAllToggle = (event) => {
    this.checkAllController = event.checked;

    if(event.checked) {
      this.listForm.get('deleteField').setValue(true);
      
      for(let lim = this.arraySource.length, i = 0; i < lim; i++) {
        this.arraySource[i]._checked = true;
      }

      this.checkedItem = true;
    } else {
      this.listForm.get('deleteField').setValue(false);

      for(let lim = this.arraySource.length, i = 0; i < lim; i++) {
        this.arraySource[i]._checked = false;
      }

      this.checkedItem = false;
    }
  }

  checkItem = (index, e) => {
    let count = 0;

    if(e.checked)
      this.checkedItem = true;

    this.arraySource[index]._checked = e.checked; 

    this.checkAllController = true;
    
    for(let lim = this.arraySource.length, i = 0; i < lim; i++) {
      if(this.arraySource[i]._checked){
        count ++;
      }
    }

    if(count == this.arraySource.length) {
      this.checkAllController = true;
    } else {
      this.checkAllController = false;
    }

    if(count < 1) {
      this.checkedItem = false;
    } else {
      this.checkedItem = true;
    }
  }

  delete = (fieldToUseInDelete) => {
    let itensToDeleteIds = [];

    for(let lim = this.arraySource.length, i = 0; i < lim; i++) {
      if(this.arraySource[i]._checked){
        itensToDeleteIds.push(this.arraySource[i][fieldToUseInDelete]);
      }
    }

    console.log(itensToDeleteIds);
  }
  
  /**
   * List area
   */
  filterArrayKey = (data) => {
    //Everything from array, ignoring property show from list object
    let noFilter = data.map((data) => {
      let backgroundColor;
      let color;
      let field;
      let fieldValue;
      let temp = [];
      
      for(let lim = Object.keys(data).length, i = 0; i < lim; i++) {
        field = Object.keys(data)[i];
        
        if(this.params.list.colorByData) {
          for(let lim = this.params.list.colorByData.length, j =0; j < lim; j++) {          
            if(field == this.params.list.colorByData[j]['field']) {
              fieldValue = Object.keys(data)[i];
              backgroundColor = this.params.list.colorByData[j]['backgroundColor'];
              color = this.params.list.colorByData[j]['color'];
              
              if(this.params.list.colorByData[j]['fieldValue'] == data[fieldValue]) {
                temp.push(data['backgroundColor'] = backgroundColor);
                temp.push(data['color'] = color);
              } else {
                temp.push(data['backgroundColor'] = "#fff");
                temp.push(data['color'] = "#000");
              }

              if(this.params.list.edit) {
              }

              /**
               * {{list.edit.route}}/{{}}
               */
            }
          }
        }
        temp.push(data[field]);
      }
      
      return temp;
    })

    //Filtered by property show in list object
    let filter = data.map((data) => {
      let backgroundColor;
      let color;
      let field;
      let fieldValue;
      let temp = [];
      
      for(let lim = this.params.list.show.length, i = 0; i < lim; i++){
        temp.push(data[this.params.list.show[i]]);
      }

      return temp;
    })
    
    this.backgroundColorIndex = (filter.length);
    this.colorIndex = (filter.length - 1);
    this.arrayNoFilter = noFilter;
    this.arraySourceFinal = filter; 
    this.arraySourceSearch = filter;

    console.log(this.arraySource)
  }

  onClickEdit = (route, param) => {
    let finalRoute = [route+":"+param];
    this.router.navigate(finalRoute);
  }

  onClickOrder = (index) => {
    let sort;

    this.params.list.order[1] ==='asc' ?  sort = "desc" : sort = "asc";
    this.params.list.order = [];

    this.params.list.order.push(this.params.list.show[index], sort);

    let readParams = {
      route: this.params.list.route,
      limit: this.params.list.limit,
      order: this.params.list.order,
      page: this.params.list.page
    }

    this.readData(readParams);
  }
  /**
   * Action area
   */
  onChangeLimit = (event) => {
    this.params.list.limit = event.value;

    let readParams = {
      route: this.params.list.route,
      limit: this.params.list.limit,
      order: this.params.list.order,
      page: this.params.list.page
    }

    this.readData(readParams);
  }

  onClickPage = (operation) => {
    console.log(this.pageCurrent);
    if(operation == 'add') {
      this.pageCurrent += 1;
    }

    if(operation == 'subtract') {
      this.pageCurrent -= 1;
    }

    let readParams = {
      route: this.params.list.route,
      limit: this.params.list.limit,
      order: this.params.list.order,
      page: this.pageCurrent
    }

    this.readData(readParams);
  }  

  readData = (readParams) => {
    this.isLoadingList = true;

    this.crud.read(readParams)
    .then(res => {
      this.isLoadingList = false;
      this.arraySource = res['obj'];
      this.filterArrayKey(this.arraySource);

      this.pageTotal = Math.ceil(this.arraySource.total/this.params.list.limit);
      
      if(this.arraySource.length < 1) {
        this.msg = "Nada na lista";
      }
    })
  }

  search = () => {
    let checkLoop = -1;
    let count;
    let data = this.arraySourceFinal;
    let dataAny;
    let dataString;
    let search;
    let temp = [];
    let test;

    if(this.searchForm.get('search').value) {
      search = this.searchForm.get('search').value;
    } else {
      search = "";
    }

    let readParams = {
      route: this.params.list.route,
      limit: this.params.list.limit,
      order: this.params.list.order,
      page: this.pageCurrent,
      search: search
    }

    this.readData(readParams);
  }

  searchInputToggle = () => {
    this.searchInput = !this.searchInput;
    this.searchForm.reset();

    if(!this.searchInput) {
      this.search();
    }
  }
}
