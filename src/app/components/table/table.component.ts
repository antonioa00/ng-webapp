import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  Inject,
  Input,
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from 'src/app/servizi/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nome',
    'cognome',
    'codFiscale',
    'numTel',
    'indirizzo',
    'compagnia',
    'numPolizza',
    'dataDecorrenza',
    'targa',
    // 'modello',
    'importo',
    'azioni',
  ];
  dataSource!: any;
  spinnerStatus: boolean = true;
  isOnTable!: boolean;
  // roba cambiata
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {}
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllPersone();
        }
      });
  }

  ngOnInit(): void {
    this.getAllPersone();
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elementi per pagina:';
    this.isOnTable = false;
  }

  getAllPersone() {
    this.api.getPersona().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource.data = Object.keys(res).map((key) => {
        //   return res[key];
        // });
        console.log(this.dataSource);
        // this.dataSource = Object.data.value.keys(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (res) {
          this.spinnerStatus = false;
        }
      },
      error: () => console.log('Errore durante il caricamento delle persone'),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePersona(id: number) {
    this.api.deletePersona(id).subscribe({
      next: (res) => {
        alert('Eliminato con successo!');
        this.getAllPersone();
      },
      error: () => {
        alert('Errore durante la rimozione!');
      },
    });
  }

  editPersona(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllPersone();
        }
      });
  }
}
