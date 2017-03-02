import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MdSlideToggleChange} from "@angular/material";

/**
 * Created by Viki on 2/6/2017.
 */

var encoding = require("text-encoding");

@Component({
  moduleId: module.id,
  selector: "ideal-security-user-details",
  templateUrl: "security-user-details.component.html"
})
export class SecurityUserDetailsComponent implements OnInit {

  private form: FormGroup;
  private sliderChecked: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.sliderChecked = true;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      countryCode: "",
      stateOrProvinceName: ""
    });
  }

  /*
  public certificationRequest() {
    let publicKey: CryptoKey;
    let privateKey: CryptoKey;
    this.keysGenerationService.generatePublicPrivateKeyPair().then((keyPair: CryptoKeyPair) => {
      publicKey = keyPair.publicKey;
      privateKey = keyPair.privateKey;
      let sequence: Promise<any> = this.certificateRequestGenerationService
        .createPKCS10Internal(privateKey, publicKey, this.userService.getAuthenticatedUser());
      sequence
        .then((pkcs10Buffer) => this.certificateRequestGenerationService.parsePEM(pkcs10Buffer),
          error => Promise.reject(`Error parsing PKCS#10 into BER: ${error}`))
        .then((pemRequest: string) => this.certificateService.sign(pemRequest),
          error => Promise.reject(`Error parsing PKCS#10 into PEM: ${error}`))
        .then((observable: Observable<any>) => observable.subscribe((result: string) =>
          this.createSecurityProfile(result, privateKey, 'Viki')));
    })
  }

  private createSecurityProfile(certificatePEM: string, privateKey: CryptoKey, passphrase: string) {
    let keyArray = this.keysGenerationService.generateSymmetricKeyFromPassword(passphrase, 6530, 32, 'SHA256');
    this.keysGenerationService.importKey(keyArray, 'raw', 'AES-CTR').then((symmetricKey: CryptoKey) => {
      this.keysGenerationService.exportKey(privateKey, 'pkcs8').then((privateRawKey: ArrayBuffer) => {
        console.log(new Uint8Array(privateRawKey));
        this.cryptographicOperations.encrypt(
          this.cryptographicOperations.getAlgorithm('AES-CTR', 'SHA-256', 'encrypt').algorithm,
          symmetricKey, privateRawKey).then((ciphertext: ArrayBuffer) => {
          let cipherArray: Uint8Array = new Uint8Array(ciphertext);
          let encodedCipher: string = this.cryptographicOperations.convertUint8ToString(cipherArray);
          let securityProfile: SecurityProfile = new SecurityProfile();
          securityProfile.certificatePEM = certificatePEM;
          securityProfile.encryptedPrivateKey = encodedCipher;
          securityProfile.agent = this.userService.getAuthenticatedUser();
          this.certificateService.save(securityProfile).subscribe((result: SecurityProfile) => console.log(result));
        });
      });
    });
  }
   */
  public changeStoringPrivateKey(value: MdSlideToggleChange) {
    this.sliderChecked = value.checked;
  }
}
