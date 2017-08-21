import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

/**Services */
import { AuthenticationService } from './../../services/laravel/authentication.service';

@Component({
  selector: 'ntm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Input() params;

  errors = [];
  loginForm: FormGroup;

  constructor(
    private authentication: AuthenticationService,
    private mdsnackbar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.params) {
      if(!this.params.route) {
        this.errors.push({
          cod: 'ntm-l-01',
          message: "Definir rota do login"
        });
      }
    } else {
      this.errors.push({
        cod: 'p-01',
        message: "Definir parâmetros mínimos do componente"
      });
    }

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  onSubmit = () => {
    this.params.email = this.loginForm.get('email');
    this.params.password = this.loginForm.get('password');

    this.authentication.login(this.loginForm.value)
    .then(res => {
      let string = JSON.stringify(res);
      let json = JSON.parse(string);
      this.mdsnackbar.open(json.message, '', {
        duration: 2000
      })

      this.router.navigate(this.params.route);
    });
  }
}