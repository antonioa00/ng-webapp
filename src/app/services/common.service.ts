import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////////////
  // -- DYNAMIC COLUMNS --
  serviceColumns = new Subject();
  savedColumns: string[] = [];
  //////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////
  // -- FILTERING SCADENZA --
  dataScadenza: any;

  filterDataSource(userList: User[]) {
    if (this.dataScadenza.start && this.dataScadenza.end) {
      let filteredDate = userList.filter(
        (user) =>
          new Date(user.dataScadenza) >= this.dataScadenza.start &&
          new Date(user.dataScadenza) <= this.dataScadenza.end
      );
      return filteredDate;
    }
    return userList;
  }
  // -- FILTERING INSOLUTI --

  //////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////
  // -- DIALOG UTILITIES --

  dataPeople!: any;
  rowID: number;
  clientMoreInfo: User;
  updateTable = new Subject();
  updateCustomers = new Subject();

  // DIALOG UPLOAD
  getData = new BehaviorSubject(123);
  updateData = new Subject();

  // INPUT MODULE (DIALOG UPLOAD CHILD)
  filesData = new BehaviorSubject('Data');

  //////////////////////////////////////////////////////////////////////////////////////
}
