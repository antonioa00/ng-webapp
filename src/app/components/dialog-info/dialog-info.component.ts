import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/servizi/dialog.service';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss'],
})
export class DialogInfoComponent implements OnInit {
  constructor(public dialogService: DialogService) {}
  infoCustomer: any;
  ngOnInit() {
    this.getData();
    // this.dataDialog = this.dialogService.dataPeople;
  }

  getData() {
    this.dialogService.updateCustomers.asObservable().subscribe((res) => {
      this.infoCustomer = res;
    });
  }
}
