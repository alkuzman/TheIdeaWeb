import {Component, Input} from "@angular/core";
import {CryptographicOperations} from "../../../../../../core/security-protocols/cryptographic-operations/cryptographic-operations";
import {KeysService} from "../../../../../../core/security-protocols/keys/keys.service";
import {CertificateRequestGenerationService} from "../../../../../../core/security-protocols/certificates/certificates-requests-generation.service";
/**
 * Created by Viki on 2/12/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-security-profile-fields-private-key",
  templateUrl: "security-profile-fields-private-key.component.html"
})
export class SecurityProfileFieldsPrivateKeyComponent {
  @Input("encryptedPrivateKey") encryptedPrivateKey: string;
  @Input("title") title: string;
  private decryptedPrivateKey: string;

  constructor(private cryptographicOperations: CryptographicOperations, private keysService: KeysService,
              private certificatesRequestsGenerationService: CertificateRequestGenerationService) {
  }

  public decrypt(password: string) {
    this.keysService.generateSymmetricKeyFromPassword(password, 6530, 32, 'SHA256')
      .then((symmetricKey: CryptoKey) => {
        this.keysService.decryptPrivateKeyWithSymmetricKeyRawFormat(this.encryptedPrivateKey, symmetricKey)
          .subscribe((privateRawKey: ArrayBuffer) => {
            this.decryptedPrivateKey = this.certificatesRequestsGenerationService.parsePrivateKeyPEM(privateRawKey);
          });
      });
  }
}
