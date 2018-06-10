import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../../domain/model/authentication/user';
import {KeysService} from '../../../core/security-protocols/keys/keys.service';
import {UserCertificationService} from '../../../core/security-protocols/certificates/user-certification.service';
import {SecurityProfile} from '../../../domain/model/security/security-profile';
import {CertificateService} from '../../../domain/services/certificate/certificate.service';
import {SecurityProfileConstructorService} from '../../../core/security-protocols/constructors/security-profile-constructor.service';
import {CertificateType} from '../../../domain/model/enumerations/certificate-type';
import {SecurityProfileService} from '../../../domain/services/security-profile/security-profile.service';
import {EncryptionPair} from '../../../domain/model/security/encryption-pair';
import {ParserPemService} from '../../../core/security-protocols/parsers/parser-pem.service';
import {SimpleCryptographicOperations} from '../../../core/security-protocols/cryptographic-operations/simple-cryptographic-operations';
import {Observable} from 'rxjs';
import {RedirectService} from '../../../core/navigation/redirect.service';
import {UserService} from '../../../domain/services/user/user.service';
import {JwtSecurityContext} from '../../../core/authentication/jwt/jwt-security-context.service';

/**
 * Created by Viki on 2/11/2017.
 */

const JSZip = require('jszip');
const saver = require('file-saver');

@Component({
  selector: 'ideal-security-profile-initialization-page',
  templateUrl: 'security-profile-initialization-page.component.html',
  styleUrls: ['security-profile-initialization-page.component.css']
})
export class SecurityProfileInitializationPageComponent implements OnInit {

  encryptedKeyPairGenerated = false;
  certificateGeneratedS = false;
  passwordEntered = false;
  saveDecision = true;
  enterPassword = true;
  stepOneFinished = false;
  private user: User;
// Security profile data
  private privateKeyE: CryptoKey;
  private privateKeyEEncrypted: string;
  private pemPublicKeyE: string;
  private privateKeyS: CryptoKey;
  private privateKeySEncrypted: string;
  private pemCertificateS: string;
  private pemCertificationRequestS: string;
  private symmetricKey: CryptoKey;
  private symmetricKeyEncrypted: string;

  constructor(private keysService: KeysService,
              private certificateRequestGenerationService: UserCertificationService,
              private securityProfileService: SecurityProfileService,
              private certificateService: CertificateService,
              private securityProfileConstructorService: SecurityProfileConstructorService,
              private pemParser: ParserPemService,
              private cryptographicOperations: SimpleCryptographicOperations,
              private redirectService: RedirectService,
              private userService: UserService,
              private cdRef: ChangeDetectorRef,
              private securityContext: JwtSecurityContext) {
  }

  ngOnInit(): void {
    this.user = this.userService.getAuthenticatedUser();

    // Generate all security profile data
    this.certificationRequestS();
    this.encryptionPair();
    this.symmetric();
  }

// After the password is entered generate password based key and encrypt all private data from security profile
  continueWithPassword(password: string) {

    // Generate password based symmetric key
    this.keysService.generateSymmetricKeyFromPassword(password)
      .then((symmetricKey: CryptoKey) => {

        // Encrypt the private key used for encryption with the newly derived key
        this.keysService.encryptPrivateKeyWithSymmetricKey(this.privateKeyE, symmetricKey)
          .subscribe((encodedEncryptedPrivateKey: string) => {
            this.privateKeyEEncrypted = encodedEncryptedPrivateKey;

            // Encrypt the private key used for signing with the newly derived key
            this.keysService.encryptPrivateKeyWithSymmetricKey(this.privateKeyS, symmetricKey)
              .subscribe((newEncodedEncrypredPrivateKey: string) => {
                this.privateKeySEncrypted = newEncodedEncrypredPrivateKey;

                // Encrypt the symmetric key used for encrypting ideas with the newly derived key
                this.keysService.encryptSymmetricKey(this.symmetricKey, symmetricKey)
                  .subscribe((encryptedSymmetricKey: string) => {
                    this.symmetricKeyEncrypted = encryptedSymmetricKey;

                    // Inform the next step that the user entered password
                    this.passwordEntered = true;

                    // Continue to next step
                    this.stepOneFinished = true;
                  });
              });
          });
      });
  }

  continueWithoutPassword() {
    // Continue to next step
    this.stepOneFinished = true;
  }

  goBackToPassword() {
    // Back to previous step
    this.stepOneFinished = false;
  }

  finish() {
    this.user.securityProfileInitialized = true;
    this.saveSecurityProfile(this.passwordEntered && this.saveDecision).subscribe((sp: SecurityProfile) => {
      this.securityContext.securityProfile = sp;
      console.log(this.securityContext.securityProfile);
      const queryParams = {'email': this.user.email};
      this.redirectService.login(queryParams);
      // TODO: Maybe should redirect to other page
    });
  }

  generateZip() {
    const zip = new JSZip();

    // Create folders
    const protocolFolder = zip.folder('ProtocolKeys');
    const ideasKeyFolder = zip.folder('SavingIdeasKey');
    const encryptionFolder = protocolFolder.folder('EncryptionKeys');
    const signingFolder = protocolFolder.folder('SigningKeys');

    // Export private key for encryption
    this.keysService.basicExportKey(this.privateKeyE, 'pkcs8').then((privateKeyEExportedBuf: ArrayBuffer) => {

      // Create file for the private key used for encryption
      encryptionFolder.file('privateKeyForEncryption.key', this.pemParser.parsePrivateKeyPEM(privateKeyEExportedBuf));

      // Export private key for signing
      this.keysService.basicExportKey(this.privateKeyS, 'pkcs8').then((privateKeySExportedBuf: ArrayBuffer) => {

        // Create file for the private key used for signing
        signingFolder.file('privateKeyForSigning.key', this.pemParser.parsePrivateKeyPEM(privateKeySExportedBuf));

        // Create file for the public key used for encryption
        encryptionFolder.file('publicKeyForEncryption.pem', this.pemPublicKeyE);

        // Create file for the certificate request for the certificate used for signing
        signingFolder.file('certificationRequestForSigningCertificatePEM.pem', this.pemCertificationRequestS);

        // Create file for the certificate used for signing
        signingFolder.file('certificateForSigningPEM.pem', this.pemCertificateS);

        // Export symmetric key used for encrypting ideas
        this.keysService.exportKey(this.symmetricKey, 'raw').subscribe((symmetricKeyExported: string) => {

          // Create file for the symmetric key used for encrypting ideas
          ideasKeyFolder.file('symmetricKeyForEncryptingIdeas.txt', symmetricKeyExported);

          // Generate the zip
          zip.generateAsync({type: 'blob'}).then((content) => {

            // Download the zip
            saver.saveAs(content);
          });
        });
      });

    });

  }

  generateZipSecure() {
    const zip = new JSZip();

    // Create folders
    const protocolFolder = zip.folder('ProtocolKeys');
    const ideasKeyFolder = zip.folder('SavingIdeasKey');
    const encryptionFolder = protocolFolder.folder('EncryptionKeys');
    const signingFolder = protocolFolder.folder('SigningKeys');

    // Create file for the private key used for encryption
    encryptionFolder.file('privateKeyForEncryptionEncrypted.pem',
      this.pemParser.parseEncryptedPrivateKeyPEM(
        this.cryptographicOperations.convertStringToUint8(this.privateKeyEEncrypted).buffer));

    // Create file for the private key used for signing
    signingFolder.file('privateKeyForSigning.key', this.pemParser.parseEncryptedPrivateKeyPEM(
      this.cryptographicOperations.convertStringToUint8(this.privateKeySEncrypted).buffer));

    // Create file for the public key used for encryption
    encryptionFolder.file('publicKeyForEncryption.pem', this.pemPublicKeyE);

    // Create file for the certificate request for the certificate used for signing
    signingFolder.file('certificationRequestForSigningCertificatePEM.pem', this.pemCertificationRequestS);

    // Create file for the certificate used for signing
    signingFolder.file('certificateForSigningPEM.pem', this.pemCertificateS);

    // Create file for the symmetric key used for encrypting ideas
    ideasKeyFolder.file('symmetricKeyForEncryptingIdeas.txt', this.symmetricKeyEncrypted);

    // Generate the zip
    zip.generateAsync({type: 'blob'}).then((content) => {

      // Download the zip
      saver.saveAs(content);
    });
  }

  // Generate encryption pair
  private encryptionPair(): void {
    this.keysService.generatePublicPrivateKeyPair(false)
      .then((keyPair: CryptoKeyPair) => {
        this.privateKeyE = keyPair.privateKey;
        this.keysService.basicExportKey(keyPair.publicKey, 'spki')
          .then((keyBuf: ArrayBuffer) => {
            this.pemPublicKeyE = this.pemParser.parsePublicKeyPEM(keyBuf);
            this.encryptedKeyPairGenerated = true;
            // this.cdRef.detectChanges();
          });
      });
  }

  // Generate certification request and send the request to be signed
  private certificationRequestS(): void {
    let publicKey: CryptoKey;
    this.keysService.generatePublicPrivateKeyPair(true).then((keyPair: CryptoKeyPair) => {
      publicKey = keyPair.publicKey;
      this.privateKeyS = keyPair.privateKey;
      this.certificateRequestGenerationService
        .createPKCS10Internal(this.privateKeyS, publicKey, this.user).then((pkcs10Buffer) => {
        const pemRequest = this.pemParser.parseCertificateRequestPEM(pkcs10Buffer);
        this.pemCertificationRequestS = pemRequest;
        this.certificateService.sign(pemRequest).subscribe((result: string) => {
          this.pemCertificateS = result;
          this.certificateGeneratedS = true;
          this.cdRef.detectChanges();
        });
      }, error => Promise.reject(`Error parsing PKCS#10 into BER: ${error}`));
    });
  }

  // Generate symmetric key
  private symmetric(): void {
    this.keysService.generateSymmetricKey().then((symmetricKey: CryptoKey) => {
      this.symmetricKey = symmetricKey;
    });
  }

  // Save security profile on server
  private saveSecurityProfile(savePrivateKey: boolean): Observable<SecurityProfile> {
    return Observable.create((observer) => {
      const encryptionPair: EncryptionPair = new EncryptionPair();
      encryptionPair.publicPem = this.pemPublicKeyE;
      let securityProfileS: SecurityProfile;
      if (savePrivateKey) {
        encryptionPair.privateEncrypted = this.privateKeyEEncrypted;
        securityProfileS = this.securityProfileConstructorService
          .createSecurityProfile(this.pemCertificationRequestS, this.pemCertificateS,
            this.privateKeySEncrypted, CertificateType.SIGNING, this.user, encryptionPair,
            this.symmetricKeyEncrypted);
      } else {
        securityProfileS = this.securityProfileConstructorService
          .createSecurityProfile(this.pemCertificationRequestS, this.pemCertificateS, undefined,
            CertificateType.SIGNING, this.user, encryptionPair, this.symmetricKeyEncrypted);
      }
      this.securityProfileService.save(securityProfileS).subscribe((result: SecurityProfile) => {
        observer.next(result);
      });
    });
  }
}

