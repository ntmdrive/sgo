import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  checkedItem: boolean = false;
  color: string;
  colorIndex: number;
  editRoute: string;
  error: any = [];
  isLoadingList: boolean = true;
  listController: FormGroup;
  msg: string;
  pageCurrent: number;
  pageTotal: number;
  searchForm: FormGroup;
  searchInput: boolean = false;
  colorByData: any;
  testingThisShit: any;
  
  constructor(
    private crud: CrudService
  ) {
    this.searchForm = new FormGroup({
      'search': new FormControl(null)
    })

    this.listController = new FormGroup({
      'row': new FormControl(null)
    })
  }

  ngOnChanges() {
    if(this.params.list) {
      if(!this.params.list.limit) {
        this.params.list.limit = 10;
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
    } 

    let readParams = {
      route: this.params.list.route,
      limit: this.params.list.limit,
      page: this.params.actionToolbar.page
    }
    
    this.pageCurrent = this.params.actionToolbar.page;

    this.readData(readParams);
  }

  ngOnInit() { 
  }

  checkAllToggle() {
    this.checkAllController = !this.checkAllController;
  }

  checkItem = (e) => {
    if(e.checked){
      this.checkedItem = true;
    } else {
      this.checkedItem = false;
    }
  }
  
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
  }

  onChangeLimit = (event) => {
    this.params.list.limit = event.value;

    let readParams = {
      route: this.params.list.route,
      limit: this.params.list.limit,
      page: this.params.list.page
    }

    this.readData(readParams);
  }

  onChangePage = (event) => {
    this.params.list.page = event.value;

    let readParams = {
      route: this.params.list.route,
      limit: this.params.list.limit,
      page: this.params.list.page
    }

    this.readData(readParams);
  }

  readData = (readParams) => {
    this.crud.read(readParams)
    .then(res => {
      this.isLoadingList = false;
      this.arraySource = res['obj'];
      this.filterArrayKey(this.arraySource);

      this.pageTotal = Math.floor(this.arraySource.total/this.params.list.limit);
      
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

    if(this.searchForm.controls.search.value) {
      search = this.searchForm.controls.search.value;
    } else {
      search = "";
    }
    switch(this.params.list.source) {
      case 'firebase':
        for(let lim = data.length, i = 0; i < lim; i ++) {
          for(let limj = (data[i].length), j = 0; j < limj; j++) {
            dataAny = data[i][j].toString();
            dataString = dataAny.toLowerCase();
            count = dataString.search(search.toLowerCase());
            
            if(count !== -1) {
              if(checkLoop != i) {
                temp.push(data[i]);
              }

              checkLoop = i;
            }
          }
        }
      break;

      case 'laravel':
        let searchParams = { route: 'users', }
        //this.crud.readArray('laravel', )
      break;

      default:
        this.error = ['list.source'] ;
    }

    this.arraySourceSearch = temp;   
  }

  searchInputToggle = () => {
    this.searchInput = !this.searchInput;
    this.searchForm.reset();

    if(!this.searchInput) {
      this.search();
    }
  }
}
