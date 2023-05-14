import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColumnsdynamicService {
  serviceColumns = new Subject();
  savedColumns: string[] = [];

  constructor() {}
}
