import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {
  constructor(public apiService: ApiService) {}

  numberCustomers!: number;
  sumPolizze!: number;
  customersLastMonth: any;
  currentDate: any = new Date(Date.now());
  subPersone: any;

  ngOnInit(): void {
    this.subPersone = this.apiService.getPersona$().subscribe({
      next: (res: any) => {
        this.sumPolizze = res.reduce(
          (acc: number, object: { importo: number }) => {
            return acc + object.importo;
          },
          0
        );
        this.numberCustomers = res.length + 1;
        this.customersLastMonth = res
          .map((item: any) => {
            // console.log(new Date(item.createdAt).getTime());
            if (
              new Date(item.createdAt).getTime() >
              this.currentDate.getTime() - 60 * 60 * 1000 * 730 // tempo oggi in ms - un mese in ms
            ) {
              return item;
            }
          })
          .filter(Boolean);
        // this.lastMonthCustomers = res.filter((item) => item.modif);
      },
    });
  }

  ngOnDestroy(): void {
    this.subPersone.unsubscribe();
  }
}
