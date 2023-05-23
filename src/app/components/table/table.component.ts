import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { ToastrService } from 'ngx-toastr';
import { DialogUploadComponent } from '../dialog-upload/dialog-upload.component';
import { DialogFilterScadenzeComponent } from './dialog-filter-scadenze/dialog-filter-scadenze.component';
import { CommonService } from 'src/app/services/common.service';
import { User } from 'src/app/shared/models/user';
import { HttpResponse } from '@angular/common/http';
import { Observer } from 'rxjs';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  filterInsoluti = false;
  displayedColumns = [];
  dataSource: any;
  spinnerStatus = true;
  isOnTable: boolean;
  sendedColumns: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private socket: SocketIoService,
    private toastr: ToastrService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getAllPersone();
    this.updateTable();
    this.realtimeUpdate();
    this.displayedColumns = JSON.parse(
      localStorage.getItem('storedColumns') || '[]'
    );

    this.socket.socketSub.subscribe(() => {
      this.getAllPersone();
    });

    this.commonService.serviceColumns.asObservable().subscribe((data: any) => {
      if (data.length === 1 && data.includes('azioni')) {
        alert(
          'Errore! Non puoi aggiungere solo le azioni senza altre colonne.'
        );
      }
      if (data.length == 0) alert('Errore! Selezionare almeno un elemento');
      else {
        this.displayedColumns = data;
        this.commonService.savedColumns = data;
        localStorage.setItem('storedColumns', JSON.stringify(data));
      }
    });
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elementi per pagina:';
    this.isOnTable = false;
  }

  realtimeUpdate() {
    this.socket.receiveServer();
  }

  getAllPersone() {
    this.api.getPersona$().subscribe({
      next: (res: User[]) => {
        // PROVVISORIO - DA RIVEDERE!
        if (this.commonService.dataScadenza) {
          res = this.commonService.filterDataSource(res);
        }
        if (this.filterInsoluti) {
          res = res.filter((user: User) => !user.dataPagamento);
        }
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (res) {
          this.spinnerStatus = false;
          this.commonService.dataPeople = res;
        }
      },
      error: () => console.log('Errore durante il caricamento delle persone'),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      console.log('PAGINATOR');
      console.log(this.dataSource.paginator);

      this.dataSource.paginator.firstPage();
      console.log(this.dataSource.paginator.firstPage);
    }
  }

  deletePersona$(id: number) {
    this.api.deletePersona$(id).subscribe({
      next: () => {
        this.socket.sendServer('deleted Persona');
        this.getAllPersone();
        this.toastr.error('Persona eliminata!');
      },
      error: () => {
        alert('Errore durante la rimozione!');
      },
    });
  }

  editPersona(row: User) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val: string) => {
        if (val === 'update') {
          this.getAllPersone();
        }
      });
  }

  addPersona() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe(() => {
        {
          this.getAllPersone();
        }
      });
  }

  updateTable() {
    this.commonService.updateTable.subscribe({
      next: () => {
        this.getAllPersone();
      },
    });
  }

  openFiles(id: number) {
    this.commonService.getData.next(id);
    this.dialog.open(DialogUploadComponent, {
      width: '50%',
    });
  }

  openInfo(id: number) {
    this.commonService.rowID = id;
    this.api.getPersonaByID$(id).subscribe({
      next: (res: User) => {
        this.commonService.updateCustomers.next(res);
        this.commonService.clientMoreInfo = res;
      },
      error: () => {
        alert('Errore durante la modifica!');
      },
    });
    this.dialog.open(DialogInfoComponent, {
      width: '30%',
    });
  }

  // --- BUTTONS ---
  onReset() {
    if (this.commonService.dataScadenza) this.commonService.dataScadenza = null;
    if (this.filterInsoluti) this.filterInsoluti = false;
    this.getAllPersone();
  }

  onInsoluti() {
    this.filterInsoluti = true;
    this.getAllPersone();
  }

  onScadenze() {
    this.dialog.open(DialogFilterScadenzeComponent, {
      width: '30%',
    });
  }

}
