import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/*Laravel*/
import { environment } from './../../../../environments/environment';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CrudService {
  errors: any = [];
  headersToAuth: any;
  optionsToAuth: any;
  url = environment.urlToApi;

  constructor(private http: Http) {}

  create = (params) => new Promise((resolve, reject) => {
    let route: string = params.route;
    let objectToCreate: any = params.objectToCreate;

    if(!route) { // Verifica se pelo menos uma child foi definida
      reject({
        cod: "c-01",
        message: "Informar erro c-01 ao administrador"
      });
    }

    this.http
    .post(
      this.url+route,
      objectToCreate
    )
    .subscribe(res => {
      resolve({
        cod: "c-02",
        message: "Cadastro feito com sucesso"//Cadastro feito com sucesso
      });
    }, rej => {
      if(rej['_body']) {
        let json = JSON.parse(rej['_body']);
        reject({
          cod: "error-c-01",
          message: JSON.stringify(json.message)
        })
      } else {
        console.log(rej)
      }
    })
  })

  read = (params) => new Promise ((resolve, reject) => {
    let hide = "", limit = "", obj, objFiltered, objFilteredTemp, objKeys, order = "", page, setGet = "", search = "", show = "";

    if(params) {
      if(!params.route) {
        reject({
          cod: "r-01",
          message: 'Defina a rota de pesquisa (route: string)'
        })
      }

      if(params.show && params.hide) {
        reject({
          cod: "ra-02",
          message: "Não pode declarar os parâmetros show e hide ao mesmo tempo"
        });
      }

      if(params.show) {
        setGet = "?";
        show = "&show=[";
        
        for(let lim = params.show.length, i =0; i < lim; i++) {
          show += params.show[i]+",";            
        }

        show = show.substring(0, show.length - 1)+"]";
      }

      if(params.hide) {
        setGet = "?";
        hide = "&hide=";
        
        for(let lim = params.hide.length, i =0; i < lim; i++) {
          hide += params.hide[i]+",";            
        }

        hide = hide.substring(0, hide.length - 1);
      }

      if(params.limit) {
        setGet = "?";
        limit = "&limit="+params.limit;
      }

      if(params.order.length == 2) {
        setGet = "?";
        order = "&order="+params.order[0]+","+params.order[1];
      }

      if(params.search) {
        setGet = "?";

        if(params.search.length == 1) {
          search = "&where["+params.search[0].where+"]="+params.search[0].value;
        }

        if(params.search.length > 1) {
          search = "&where";
        }
      }

      if(!params.page) {
        setGet = "?";
        page = "page=1";
      } else {
        setGet = "?";
        page = "page="+params.page;
      }

      this.headersToAuth = new Headers({
        'Authorization': sessionStorage.getItem('access_token')
      });

      this.optionsToAuth = new RequestOptions({
        'headers': this.headersToAuth
      })

      this.http.get(
        environment.urlToApi + params.route + setGet + page +  show + hide + limit + order + search,
        this.optionsToAuth
      )
      .subscribe(res => {
        obj = JSON.parse(res['_body']);
        objFiltered = obj.data;
        objFiltered.total = obj.total;
        
        if(params.show) {
          objFilteredTemp = obj.data;
          objFiltered = [];
          
          for(let lim = objFilteredTemp.length, i =0; i < lim; i++) {
            let temp = {};

            for(let j = 0; j < params.show.length; j++) {
              temp[params.show[j]] = objFilteredTemp[i][params.show[j]];
            }

            objFiltered.push(temp);
          }

          obj = objFiltered;

          resolve({
            obj
          });
        } else {
          obj = objFiltered;
          
          resolve({
            obj
          });
        }
      })
    } else {
      reject({
        cod: "p-01",
        message: "Definir parâmetros mínimos do serviço"
      })
    }
  })

  update = (params) => new Promise((resolve, reject) => {
    let route: string = params.route;
    let objectToUpdate: any = params.objectToUpdate;
    let paramToUpdate: any = params.param;

    if(!route) {
      reject({
        cod: "u-01",
        message: "Informar erro u-01 ao administrador"
      });
    }

    if(!paramToUpdate) {
      reject({
        cod: "u-02",
        message: "Informar erro u-02 ao administrador"
      });
    }

    this.http
    .post(
      this.url+route+"/"+paramToUpdate,
      objectToUpdate
    )
    .subscribe(res => {
      resolve({
        cod: "u-02",
        message: "Atualização feita com sucesso"
      });
    }, rej => {
      if(rej['_body']) {
        let json = JSON.parse(rej['_body']);
        reject({
          cod: "error-c-01",
          message: JSON.stringify(json.message)
        })
      } else {
        console.log(rej)
      }
    })
  })
}
