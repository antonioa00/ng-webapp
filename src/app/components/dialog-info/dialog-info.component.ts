import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss'],
})
export class DialogInfoComponent implements OnInit {
  constructor(public commonService: CommonService) {}
  infoCustomer: any;
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.commonService.updateCustomers.asObservable().subscribe((res) => {
      console.log('PRE INFO CUSTOMER', this.infoCustomer);
      console.log(typeof res);
      console.log('RES', res);
      if (typeof res === 'object' && res != undefined) {
        this.infoCustomer = res;
      }
      console.log('POST INFO CUSTOMER', this.infoCustomer);
    });
  }
}
