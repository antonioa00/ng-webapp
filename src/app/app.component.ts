import { OnInit, Component, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { TableComponent } from './components/table/table.component';
import { Router, RouterLink } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Assicurando';

  @ViewChild(DialogComponent) child: any;
  @ViewChild(TableComponent) table: any;
  @ViewChild(StatsComponent) stats: any;

  isOnTable: boolean = false;
  status: boolean = true;

  constructor(private dialog: MatDialog, public router: Router) {}

  ngOnInit() {}

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe(() => {
        {
          this.table.getAllPersone();
          // come era prima
          // .subscribe((val) => {
          //   if (this.table.val === 'save') {
          //     this.table.getAllPersone();
        }
      });
  }
}
