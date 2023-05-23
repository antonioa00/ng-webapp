import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  actionBtn = 'Salva';
  personaForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private commonService: CommonService,
    private socket: SocketIoService,
    private toastr: ToastrService
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
        this.api.postPersona$(this.personaForm.value).subscribe({
          next: (res) => {
            this.personaForm.reset();
            this.dialogRef.close('save');
            this.commonService.updateTable.next(true);
            this.socket.sendServer('added Persona');
            this.toastr.success('Persona aggiunta!');
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
    this.api.putPersona$(this.personaForm.value, this.editData._id).subscribe({
      // ricordati che secondo parametro era this.editData.id
      next: () => {
        this.personaForm.reset();
        this.dialogRef.close('update');
        this.socket.sendServer('updated Persona');
        this.toastr.info('Persona modificata!');
      },
      error: () => {
        alert('Errore durante la modifica!');
      },
    });
  }

  formValidation() {
    this.personaForm = this.formBuilder.group({
      // PERSONA
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
      // POLIZZA
      compagnia: [''],
      numPolizza: ['', Validators.pattern('^[0-9]*$')],
      numSostituta: [''],
      numAbbinata: [''],
      frazionamento: [''],
      dataEmissione: [''],
      pervenuta: [''],
      dataScadenza: [''],
      dataScadenza2: [''],
      importo: ['', Validators.pattern('^[0-9]*$')],
      tipoPagamento: [''],
      dataPagamento: [''],
      // VEICOLO
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
      numKw: [''],
      note: [''],
    });
  }

  formModify() {
    // ---- PERSONA ----
    this.personaForm.controls['nome'].setValue(this.editData.nome);
    this.personaForm.controls['codFiscale'].setValue(this.editData.codFiscale);
    this.personaForm.controls['numTel'].setValue(this.editData.numTel);
    this.personaForm.controls['email'].setValue(this.editData.email);
    this.personaForm.controls['indirizzo'].setValue(this.editData.indirizzo);
    this.personaForm.controls['classe'].setValue(this.editData.classe);
    this.personaForm.controls['classePre'].setValue(this.editData.classePre);

    // ---- POLIZZA ----
    this.personaForm.controls['compagnia'].setValue(this.editData.compagnia);
    this.personaForm.controls['numPolizza'].setValue(this.editData.numPolizza);
    this.personaForm.controls['numSostituta'].setValue(
      this.editData.numSostituta
    );
    this.personaForm.controls['numAbbinata'].setValue(
      this.editData.numAbbinata
    );
    this.personaForm.controls['frazionamento'].setValue(
      this.editData.frazionamento
    );
    this.personaForm.controls['dataEmissione'].setValue(
      this.editData.dataEmissione
    );
    this.personaForm.controls['pervenuta'].setValue(this.editData.pervenuta);
    this.personaForm.controls['dataScadenza'].setValue(
      this.editData.dataScadenza
    );
    this.personaForm.controls['dataScadenza2'].setValue(
      this.editData.dataScadenza2
    );
    this.personaForm.controls['importo'].setValue(this.editData.importo);
    this.personaForm.controls['tipoPagamento'].setValue(
      this.editData.tipoPagamento
    );
    this.personaForm.controls['dataPagamento'].setValue(
      this.editData.dataPagamento
    );

    // ---- VEICOLO ----
    this.personaForm.controls['targa'].setValue(this.editData.targa);
    this.personaForm.controls['modello'].setValue(this.editData.modello);
    this.personaForm.controls['numCilindrata'].setValue(
      this.editData.numCilindrata
    );
    this.personaForm.controls['numCavalli'].setValue(this.editData.numCavalli);
    this.personaForm.controls['numQuintali'].setValue(
      this.editData.numQuintali
    );
    this.personaForm.controls['numKw'].setValue(this.editData.numKw);
    console.log(this.personaForm.controls);
    console.log(this.editData);

    // ---- ALTRO ----
    this.personaForm.controls['note'].setValue(this.editData.note);

    this.actionBtn = 'Modifica';
  }
}
