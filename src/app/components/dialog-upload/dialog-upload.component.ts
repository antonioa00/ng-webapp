import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DialogService } from 'src/app/servizi/dialog.service';
@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.scss'],
})
export class DialogUploadComponent {
  @ViewChild('FileSelect') FileSelect: ElementRef;
  displayedColumns: String[] = ['position', 'name', 'weight'];
  ELEMENT_DATA: any = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  ];
  dataSource = this.ELEMENT_DATA;
  // infoCustomer: any;

  constructor(private dialogService: DialogService) {}

  public openFileDialog() {
    const e: HTMLElement = this.FileSelect.nativeElement;
    e.click();
  }
}
