import {Component, OnInit} from '@angular/core';
import {MyTesterService} from "../../core/security-protocols/my-tester.service";
import {SecurityPasswordDialogComponent} from "../../domain/security/components/security-password-dialog/security-password-dialog.component";
import {MatDialog} from "@angular/material";
import {EncryptingService} from "../../core/security-protocols/encrypting.service";
import {DecryptingService} from "../../core/security-protocols/decrypting.service";

@Component({
  selector: 'ideal-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(private myTester: MyTesterService, private dialog: MatDialog,
              private eS: EncryptingService, private ds: DecryptingService) {
  }

  ngOnInit() {
  }

  testEncryptionHereDecryptionServerSide() {
    const dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
    dialogRef.afterClosed().subscribe((password: string) => {
      this.myTester.testEncryptionHereDecryptionServerSide(password);
    });
  }

  testAsynchronousEncryption() {
    const dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
    dialogRef.afterClosed().subscribe((password: string) => {
      this.myTester.testAsynchronousEncryptionDecryption(password);
    });
  }

  testDecryptingSessionKey() {
    const dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
    dialogRef.afterClosed().subscribe((password: string) => {
      this.myTester.testDecryptingSessionKey(password);
    });
  }

  testSolutionEncryptingServices() {
    const text = "JEdHEgc8I+kCiCCf";
    const dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
    dialogRef.afterClosed().subscribe((password: string) => {
      this.ds.decryptSolution(text, password)
        .subscribe((decryptedText: string) => {
          console.log(decryptedText);
        });
    });
  }

}
