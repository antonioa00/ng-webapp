import { Component } from '@angular/core';
import { ApiService } from '../servizi/api.service';
import { LoginSettings } from '../data/login-settings';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  originalLoginSettings: LoginSettings = {
    // da rinominare
    username: '',
    password: '',
  };
  wrongAdmin: boolean = false;
  loginSettings: LoginSettings = { ...this.originalLoginSettings };
  constructor(private api: ApiService, private router: Router) {}

  onLogin(login: NgForm) {
    this.api.postLogin$(this.loginSettings).subscribe(
      (result: any) => {
        if (result.data && result.status === 'ok') {
          console.log(`Hai effettuato l'accesso!`);
          login.reset();
          this.wrongAdmin = false;
          this.router.navigate(['/home']);
        }
      },
      (error: any) => {
        if (error.status) {
          this.wrongAdmin = true;
        }
      }
    );
  }
}
