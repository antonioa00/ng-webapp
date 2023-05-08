import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dataPeople!: any;
  rowID: any;
  clientMoreInfo: any;
  constructor() {}
  updateTable = new Subject();
  updateCustomers = new Subject();
}
