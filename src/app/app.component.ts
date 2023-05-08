import { OnInit, Component, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { TableComponent } from './components/table/table.component';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from './servizi/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Assicurando';

  isOnTable: boolean = false;
  status: boolean = true;
  constructor(
    private dialog: MatDialog,
    public router: Router,
    public api: ApiService
  ) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe(() => {
        {
        }
      });
  }
}
