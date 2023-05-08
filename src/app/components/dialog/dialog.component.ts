import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/servizi/api.service';
import { DialogService } from 'src/app/servizi/dialog.service';
import { SocketIoService } from 'src/app/servizi/socket.io.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  actionBtn: string = 'Salva';
  personaForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private dialogService: DialogService,
    private socket: SocketIoService
  ) {}
  ngOnInit(): void {
    this.formValidation();
    if (this.editData) {
      this.formModify();
    }
  }

  addPersona() {
    if (!this.editData) {
      if (this.personaForm.valid) {
        this.api.postPersona(this.personaForm.value).subscribe({
          next: (res) => {
            alert('Persona aggiunta con successo!');
            this.personaForm.reset();
            this.dialogRef.close('save');
            this.dialogService.updateTable.next('aggiorna');
            this.socket.passServer(res);
          },
          error: () => {
            alert('Errore!');
          },
        });
      }
    } else {
      this.updatePersona();
    }
  }

  updatePersona() {
    this.api.putPersona(this.personaForm.value, this.editData._id).subscribe({
      // ricordati che secondo parametro era this.editData.id
      next: () => {
        alert('Modificato con successo!');
        this.personaForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Errore durante la modifica!');
      },
    });
  }

  formValidation() {
    this.personaForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      // Validators.pattern('^[a-zA-Z]+$ ')
      codFiscale: [
        '',
        [
          Validators.pattern(
            `^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$`
          ),
        ],
      ],
      numTel: ['', [Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      email: [''],
      indirizzo: [''],
      classe: [''],
      classePre: [''],
      compagnia: [''],
      // tipoAssicurazione: [Validators.required],
      numPolizza: ['', Validators.pattern('^[0-9]*$')],
      numSostituta: [''],
      numAbbinata: [''],
      dataEmissione: [''],
      dataScadenza: [''],
      importo: ['', Validators.pattern('^[0-9]*$')],
      targa: [
        '',
        [
          Validators.maxLength(7),
          Validators.pattern(`^[A-Za-z]{2}[0-9]{3}[A-Za-z]{2}`),
        ],
      ],
      modello: [''],
      numCilindrata: [''],
      numCavalli: [''],
      numQuintali: [''],
      note: [''],
    });
  }

  formModify() {
    // persona
    this.personaForm.controls['nome'].setValue(this.editData.nome);
    // this.personaForm.controls['cognome'].setValue(this.editData.cognome);
    this.personaForm.controls['codFiscale'].setValue(this.editData.codFiscale);
    this.personaForm.controls['numTel'].setValue(this.editData.numTel);
    this.personaForm.controls['email'].setValue(this.editData.email);
    this.personaForm.controls['indirizzo'].setValue(this.editData.indirizzo);
    this.personaForm.controls['classe'].setValue(this.editData.classe);
    this.personaForm.controls['classePre'].setValue(this.editData.classePre);

    // polizza
    this.personaForm.controls['numPolizza'].setValue(this.editData.numPolizza);
    this.personaForm.controls['numSostituta'].setValue(
      this.editData.numSostituta
    );
    this.personaForm.controls['dataEmissione'].setValue(
      this.editData.dataEmissione
    );
    this.personaForm.controls['dataScadenza'].setValue(
      this.editData.dataScadenza
    );

    this.personaForm.controls['importo'].setValue(this.editData.importo);
    // veicolo
    this.personaForm.controls['modello'].setValue(this.editData.modello);
    this.personaForm.controls['cilindrata'].setValue(this.editData.cilindrata);
    this.personaForm.controls['cavalli'].setValue(this.editData.cavalli);
    this.personaForm.controls['quintali'].setValue(this.editData.quintali);

    this.personaForm.controls['targa'].setValue(this.editData.targa);
    this.personaForm.controls['compagnia'].setValue(this.editData.compagnia);

    this.personaForm.controls['note'].setValue(this.editData.note);

    this.actionBtn = 'Modifica';
  }
}
