import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InputModifyComponent } from './input-modify/input-modify.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.scss'],
})
export class DialogUploadComponent implements OnInit {
  @ViewChild('FileSelect') FileSelect: any;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  displayedColumns = ['fileName', 'type', 'actions'];
  fileToUpload: File;
  fileToUploadName: string;
  updateTable: any;
  userID: number;
  userName: string;
  spinnerStatus = true;
  dataSource: MatTableDataSource<any>;
  viewBtn = 'Visualizza';
  allPersonaData: any;
  constructor(
    private commonService: CommonService,
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.commonService.getData.subscribe({
      next: (res: any) => {
        this.userID = res;
        this.api.getPersonaByID$(this.userID).subscribe({
          next: (res: any) => {
            this.userName = res.nome;
            this.allPersonaData = res;
          },
        });
      },
    });
    this.refreshTable();
  }

  public openFileDialog() {
    const e = this.FileSelect.nativeElement;
    e.click();
  }

  onFileSelected(event: any) {
    let userID: number | undefined = undefined;
    this.fileToUpload = <File>event.target!.files[0];
    this.fileToUploadName = event.target!.files[0].name;
    const fd = new FormData();
    fd.append('file', this.fileToUpload);
    this.api.postUpload$(this.userID, fd).subscribe({
      next: (res: any) => {
        console.log('dati inviati', res);
        this.refreshTable();
      },
    });
    this.spinnerStatus = true;
  }

  refreshTable() {
    this.api.getPersonaByID$(this.userID).subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.file);
        console.log('REFRESH TABLE ESEGUITO');
        this.spinnerStatus = false;
        if (res != undefined) this.commonService.filesData.next(res);
      },
    });
  }

  deleteFile(filekey: string) {
    this.api.deleteFile$(this.userID, filekey).subscribe({
      next: () => {
        console.log('eliminato con successo');
        this.refreshTable();
        this.spinnerStatus = true;
      },
    });
  }

  onModify(file: any) {
    this.dialog
      .open(InputModifyComponent, {
        width: '30%',
        data: { file: file, allPersonaData: this.allPersonaData },
      })
      .afterClosed()
      .subscribe({
        next: () => this.refreshTable(),
      });
  }
}
