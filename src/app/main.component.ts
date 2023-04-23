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
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  text: string = '';
  randomIndex!: number;

  constructor(private api: ApiService) {}
  ngOnInit() {
    this.getQuotes();
  }
  getQuotes() {
    this.api.getQuotes().subscribe({
      next: (res: any) => {
        this.randomIndex = Math.floor(Math.random() * res.length);
        this.text = String(res[this.randomIndex].text);
      },
    });
  }
}
