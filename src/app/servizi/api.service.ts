import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { LoginSettings } from '../data/login-settings';
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { DialogService } from './dialog.service';
import { NgZone } from '@angular/core';
@Injectable({
  providedIn: 'root',
  // possiamo accedervi da qualsiasi componente
})
export class ApiService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  constructor(
    private http: HttpClient,
    private dialogService: DialogService,
    private _zone: NgZone
  ) {
    const token = localStorage.getItem('assicurando_auth');
    this._isLoggedIn$.next(!!token);
  }

  // per aggiungere
  // https://ass-server-render.onrender.com/users/
  postPersona$(dato: any) {
    return this.http.post<any>('http://localhost:3000/users/', dato);
  }
  // http://localhost:3000/users/
  // per leggere
  getPersona$() {
    return this.http.get<any>('http://localhost:3000/users/');
  }

  // per modificare
  putPersona$(data: any, id: any) {
    return this.http.patch<any>('http://localhost:3000/users/' + id, data);
  }

  // read by id
  getPersonaByID$(id: any) {
    return this.http.get<any>('http://localhost:3000/users/' + id);
  }

  // per eliminare
  deletePersona$(id: any) {
    return this.http.delete<any>('http://localhost:3000/users/' + id);
  }

  postLogin$(LoginSettings: LoginSettings) {
    return this.http
      .post('http://localhost:3000/auth/login', LoginSettings)
      .pipe(
        tap((response: any) => {
          this._isLoggedIn$.next(true);
          localStorage.setItem('assicurando_auth', response.data);
        })
      );
  }
}
