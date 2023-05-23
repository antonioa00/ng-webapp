import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogUploadComponent } from '../dialog-upload.component';
import { ApiService } from 'src/app/services/api.service';
import { FileInt, User } from 'src/app/shared/models/user';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-input-modify',
  templateUrl: './input-modify.component.html',
  styleUrls: ['./input-modify.component.scss'],
})
export class InputModifyComponent implements OnInit {
  inputNameValue = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { file: FileInt; allPersonaData: User },
    private dialogRef: MatDialogRef<DialogUploadComponent>,
    private api: ApiService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    console.log('NGONINIT', this.data);
    console.log(this.data.allPersonaData._id);
  }

  onSave() {
    this.commonService.filesData.subscribe({
      next: (res: any) => {
        console.log('DIALOGSERVICE', res);
        const indexModify = res.file.findIndex(
          (obj: any) => obj.key == this.data.file.key
        );
        console.log(indexModify);
        res.file[indexModify].originalname = this.inputNameValue;
        this.api.patchPersona$(this.data.allPersonaData._id, res).subscribe({
          next: (res) => console.log(res),
        });
        this.dialogRef.close();
      },
    });
  }
}
