import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { ApiService } from 'src/app/servizi/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/servizi/dialog.service';
import { SocketIoService } from 'src/app/servizi/socket.io.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nome',
    'codFiscale',
    'numTel',
    'indirizzo',
    'compagnia',
    'numPolizza',
    'dataEmissione',
    'targa',
    'importo',
    'azioni',
  ];
  dataSource!: any;
  spinnerStatus: boolean = true;
  isOnTable!: boolean;
  camillo = 'bbbb';
  // roba cambiata
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @Output() sendFunctionData = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private dialogService: DialogService,
    private socket: SocketIoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllPersone();
    this.updateTable();
    this.realtimeUpdate();
    this.socket.socketSub.subscribe(() => {
      this.getAllPersone();
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
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource.data = Object.keys(res).map((key) => {
        //   return res[key];
        // });
        this.camillo = JSON.stringify(this.dataSource._data._value);
        // this.dataSource = Object.data.value.keys(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (res) {
          this.spinnerStatus = false;
          // this.dialogService.updateTable.next(res);
          this.dialogService.dataPeople = res;
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
      next: (res) => {
        // alert('Eliminato con successo!');
        this.socket.sendServer('deleted Persona');
        this.getAllPersone();
        this.toastr.error('Persona eliminata!');
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
    this.dialogService.updateTable.subscribe({
      next: () => {
        this.getAllPersone();
      },
    });
  }

  openInfo(id: number) {
    this.dialogService.rowID = id;
    this.api.getPersonaByID$(id).subscribe({
      // ricordati che secondo parametro era this.editData.id
      next: (res) => {
        this.dialogService.updateCustomers.next(res);
        this.dialogService.clientMoreInfo = res;
        // alert('Utente ottenuto con successo');
      },
      error: () => {
        alert('Errore durante la modifica!');
      },
    });
    this.dialog.open(DialogInfoComponent, {
      width: '30%',
    });
  }
}
