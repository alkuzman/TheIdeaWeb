import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {CardInformation} from "../../../../model/security/data/card-information";

@Component({
  selector: 'ideal-card-information-dialog',
  templateUrl: './card-information-dialog.component.html',
  styleUrls: ['./card-information-dialog.component.css']
})
export class CardInformationDialogComponent implements OnInit {
  public cardInformation: CardInformation;

  constructor(private dialogRef: MatDialogRef<CardInformationDialogComponent>) { }

  ngOnInit() {
    this.cardInformation = {};
  }

  public closeDialog() {
    this.dialogRef.close(this.cardInformation);
  }

}
