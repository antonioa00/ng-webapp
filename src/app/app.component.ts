import { OnInit, Component, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogSettingsComponent } from './components/dialog-settings/dialog-settings.component';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Assicurando';

  isOnTable = false;
  status = true;
  opened = false;
  constructor(
    private dialog: MatDialog,
    public router: Router,
    public api: ApiService
  ) {}
}
