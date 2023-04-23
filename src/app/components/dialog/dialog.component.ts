import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/servizi/api.service';
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
    private dialogRef: MatDialogRef<DialogComponent>
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
    this.api.putPersona(this.personaForm.value, this.editData.id).subscribe({
      next: (res) => {
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
      nome: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      cognome: ['', [Validators.pattern('^[a-zA-Z]+$')]],
      codFiscale: [
        '',
        [
          Validators.pattern(
            `^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$`
          ),
        ],
      ],
      numTel: ['', [Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      indirizzo: ['', [Validators.required]],
      compagnia: [''],
      // tipoAssicurazione: [Validators.required],
      numPolizza: ['', Validators.pattern('^[0-9]*$')],
      dataDecorrenza: ['', Validators.required],
      targa: [
        '',
        [
          Validators.required,
          Validators.maxLength(7),
          Validators.pattern(`^[A-Za-z]{2}[0-9]{3}[A-Za-z]{2}`),
        ],
      ],
      modello: ['', Validators.required],
      importo: ['', Validators.pattern('^[0-9]*$')],
      note: [''],
    });
  }

  formModify() {
    this.personaForm.controls['nome'].setValue(this.editData.nome);
    this.personaForm.controls['cognome'].setValue(this.editData.cognome);
    this.personaForm.controls['codFiscale'].setValue(this.editData.codFiscale);
    this.personaForm.controls['numTel'].setValue(this.editData.numTel);
    this.personaForm.controls['indirizzo'].setValue(this.editData.indirizzo);
    this.personaForm.controls['numPolizza'].setValue(this.editData.numPolizza);
    this.personaForm.controls['dataDecorrenza'].setValue(
      this.editData.dataDecorrenza
    );
    this.personaForm.controls['importo'].setValue(this.editData.importo);
    this.personaForm.controls['modello'].setValue(this.editData.modello);
    this.personaForm.controls['targa'].setValue(this.editData.targa);
    this.personaForm.controls['compagnia'].setValue(this.editData.compagnia);

    this.personaForm.controls['note'].setValue(this.editData.note);
    // this.personaForm.controls['tipoAssicurazione'].setValue(this.editData.tipoAssicurazione);
    this.actionBtn = 'Modifica';
  }
}
