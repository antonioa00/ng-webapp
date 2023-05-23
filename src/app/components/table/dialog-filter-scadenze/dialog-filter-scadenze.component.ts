import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dialog-filter-scadenze',
  templateUrl: './dialog-filter-scadenze.component.html',
  styleUrls: ['./dialog-filter-scadenze.component.scss'],
})
export class DialogFilterScadenzeComponent implements OnInit, OnDestroy {
  constructor(private commonService: CommonService) {}
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  ngOnInit() {
    console.log(this.range.value);
  }
  ngOnDestroy(): void {
    this.commonService.dataScadenza = this.range.value;
    this.commonService.updateTable.next(true);
  }
}
