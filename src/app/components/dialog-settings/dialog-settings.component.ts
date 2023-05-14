import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColumnsdynamicService } from 'src/app/servizi/columnsdynamic.service';

@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.scss'],
})
export class DialogSettingsComponent implements OnInit {
  columns: any;
  dynamColumns = this._formBuilder.group({
    nome: false,
    codFiscale: false,
    numTel: false,
    indirizzo: false,
    classe: false,
    classePre: false,
    compagnia: false,
    numPolizza: false,
    numSostituta: false,
    numAbbinata: false,
    frazionamento: false,
    dataEmissione: false,
    pervenuta: false,
    dataScadenza: false,
    dataScadenza2: false,
    importo: false,
    tipoPagamento: false,
    dataPagamento: false,
    targa: false,
    modello: false,
    numCilindrata: false,
    numCavalli: false,
    numQuintali: false,
    numKw: false,
    azioni: false,
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<DialogSettingsComponent>,
    private colDynamic: ColumnsdynamicService
  ) {}

  ngOnInit(): void {
    console.log(this.dynamColumns);
    // prettier-ignore
    this.dynamColumns.patchValue(JSON.parse(localStorage.getItem('storedCheckboxes') ||'{}'));
  }

  onSave() {
    let selectedColumns = Object.entries(this.dynamColumns.value).reduce(
      (acc: any, [key, value]) => {
        if (value) {
          acc.push(key);
        }
        return acc;
      },
      []
    );
    if (
      (selectedColumns.includes('azioni') && selectedColumns.length == 1) ||
      selectedColumns.length == 0
    ) {
      alert('Errore');
    } else {
      this.colDynamic.serviceColumns.next(selectedColumns);
      this._dialogRef.close();
      // prettier-ignore
      localStorage.setItem('storedCheckboxes',JSON.stringify(this.dynamColumns.value));
    }

    console.log(selectedColumns);

    // da rivedere
    // let valueCheckbox = Object.entries(this.dynamColumns.value).reduce(
    //   (acc: { key: string; value: boolean }[], [key, value]) => {
    //     if (value) {
    //       acc.push({ key, value });
    //     }
    //     return acc;
    //   },
    //   []
    // );
    // localStorage.setItem(
    //   'storedCheckboxes',
    //   JSON.stringify(this.dynamColumns.value)
    // );
  }
}
