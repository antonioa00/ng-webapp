import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from './servizi/api.service';
import { ObserversModule } from '@angular/cdk/observers';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})


export class MainComponent implements OnInit {
  constructor(private api: ApiService) {}
  ngOnInit() {
  }
}
