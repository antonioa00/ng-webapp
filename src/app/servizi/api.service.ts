import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
  // possiamo accedervi da qualsiasi componente
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // per modificare
  postPersona(dato: any) {
    return this.http.post<any>('http://localhost:3000/personeLista', dato);
  }
  // per leggere
  getPersona() {
    return this.http.get<any>('http://localhost:3000/personeLista');
  }

  // per modificare
  putPersona(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/personeLista/' + id, data);
  }

  deletePersona(id: number) {
    return this.http.delete<any>('http://localhost:3000/personeLista/' + id);
  }

  getQuotes() {
    return this.http.get<any>('https://type.fit/api/quotes');
  }
}
