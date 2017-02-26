import {Component, Input} from "@angular/core";
import {KeysService} from "../../../../../../core/security-protocols/keys/keys.service";
import {ParserPemService} from "../../../../../../core/security-protocols/parsers/parser-pem.service";
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

  constructor(private keysService: KeysService,
              private pemParser: ParserPemService) {
  }

  public decrypt(password: string) {
    this.keysService.generateSymmetricKeyFromPassword(password)
      .then((symmetricKey: CryptoKey) => {
        this.keysService.decryptPrivateKeyWithSymmetricKeyRawFormat(this.encryptedPrivateKey, symmetricKey)
          .subscribe((privateRawKey: ArrayBuffer) => {
            this.decryptedPrivateKey = this.pemParser.parsePrivateKeyPEM(privateRawKey);
          });
      });
  }
}
