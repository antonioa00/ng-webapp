import { OnInit, Component, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DialogSettingsComponent } from '../components/dialog-settings/dialog-settings.component';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
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

  openSettings() {
    let dialogRef = this.dialog.open(DialogSettingsComponent, {
      width: '30%',
    });
  }
}
