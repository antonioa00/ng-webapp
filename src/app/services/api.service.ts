import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginSettings } from '../data/login-settings';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('assicurando_auth');
    this._isLoggedIn$.next(!!token);
  }

  // https://ass-server-render.onrender.com/users/
  //////////////////////////////////////////////////////////////////////////////////////
  // -- CRUD OPERATIONS --

  // POST - ADD USER
  postPersona$(dato: User) {
    return this.http.post<any>('http://localhost:3000/users/', dato);
  }
  // GET - READ USER
  getPersona$() {
    return this.http.get<User[]>('http://localhost:3000/users/');
  }

  // PUT - UPDATE USER (ALL OBJECT)
  putPersona$(data: User, id: number) {
    return this.http.patch<any>('http://localhost:3000/users/' + id, data);
  }

  // GET - GET USER BY ID
  getPersonaByID$(id: number) {
    return this.http.get<User>('http://localhost:3000/users/' + id);
  }

  // DELETE
  deletePersona$(id: number) {
    return this.http.delete<string>('http://localhost:3000/users/' + id);
  }

  // PATCH - MODIFY USER (ONLY ONE DATA)
  patchPersona$(id: number, data: User) {
    return this.http.patch<any>('http://localhost:3000/users/' + id, data);
  }

  //////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////
  // -- LOGIN --

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
  //////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////
  // -- FILE UPLOAD --
  postUpload$(id: any, data: any) {
    return this.http.post(`http://localhost:3000/${id}/upload`, data);
  }

  // -- FILE DELETE --
  deleteFile$(id: any, filekey: any) {
    return this.http.delete(`http://localhost:3000/delete/${id}/${filekey}`);
  }

  //////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////
  // MODIFY FILE NAME IN DATABASE

  //////////////////////////////////////////////////////////////////////////////////////
}
