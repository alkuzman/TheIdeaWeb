import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../domain/model/authentication/user";
import {KeysService} from "../../core/security-protocols/keys/keys.service";
import {CertificateRequestGenerationService} from "../../core/security-protocols/certificates/certificates-requests-generation.service";
import {SecurityProfile} from "../../domain/model/security/security-profile";
import {CertificateService} from "../../domain/services/certificate/certificate.service";
import {SecurityProfileConstructorService} from "../../core/security-protocols/constructors/security-profile-constructor.service";
import {CertificateType} from "../../domain/model/enumerations/certificate-type";
import {SecurityProfileService} from "../../domain/services/security-profile/security-profile.service";
import {EncryptionPair} from "../../domain/model/security/encryption-pair";
import {ParserPemService} from "../../core/security-protocols/parsers/parser-pem.service";
/**
 * Created by Viki on 2/11/2017.
 */

@Component({
    moduleId: module.id,
    selector: "ideal-verify-page-component",
    templateUrl: "verify-page.component.html"
})
export class VerifyPageComponent implements OnInit {
    private user: User;
    private privateKeyE: CryptoKey;
    private privateKeyEEncrypted: string;
    private _pemPublicKeyE: string;
    private privateKeyS: CryptoKey;
    private privateKeySEncrypted: string;
    private _pemCertificateS: string;
    private _pemCertificationRequestS: string;
    private symmetricKey: CryptoKey;
    private symmetricKeyEncrypted: string;
    private password: string;

    private encryptedKeyPairGenerated: boolean = false;
    private certificateGeneratedS: boolean = false;
    private passwordEntered: boolean = false;
    private saveDecision = false;
    private savePrivateKey: string = "YES";

    constructor(private route: ActivatedRoute, private keysService: KeysService,
                private certificateRequestGenerationService: CertificateRequestGenerationService,
                private securityProfileService: SecurityProfileService,
                private certificateService: CertificateService,
                private securityProfileConstructorService: SecurityProfileConstructorService,
                private pemParser: ParserPemService) {
    }

    ngOnInit(): void {
        this.route.data.subscribe((data: {user: User}) => {
            this.user = data.user;
            this.certificationRequestS();
            this.encryptionPair();
            this.symmetric();
        });
    }

    public passwordReady(password: string) {
        this.password = password;
        this.keysService.generateSymmetricKeyFromPassword(this.password)
            .then((symmetricKey: CryptoKey) => {
                this.keysService.encryptPrivateKeyWithSymmetricKey(this.privateKeyE, symmetricKey)
                    .subscribe((encodedEncryptedPrivateKey: string) => {
                        this.privateKeyEEncrypted = encodedEncryptedPrivateKey;
                        this.keysService.encryptPrivateKeyWithSymmetricKey(this.privateKeyS, symmetricKey)
                            .subscribe((encodedEncryptedPrivateKey: string) => {
                                this.privateKeySEncrypted = encodedEncryptedPrivateKey;
                                this.passwordEntered = true;
                                this.keysService.encryptSymmetricKey(this.symmetricKey, symmetricKey)
                                    .subscribe((encryptedSymmetricKey: string) => {
                                        this.symmetricKeyEncrypted = encryptedSymmetricKey;
                                    });
                            });
                    });
            });
    }

    public saveDecisionMade() {
        if (this.savePrivateKey == "YES") {
            console.log("YES");
            this.saveSecurityProfile(true);
        } else {
            console.log("NO");
            this.saveSecurityProfile(false);
        }
    }

    private saveSecurityProfile(savePrivateKey: boolean) {
        let encryptionPair: EncryptionPair = new EncryptionPair();
        encryptionPair.publicPem = this._pemPublicKeyE;
        let securityProfileS: SecurityProfile;
        if (savePrivateKey) {
            encryptionPair.privateEncrypted = this.privateKeyEEncrypted;
            securityProfileS = this.securityProfileConstructorService
                .createSecurityProfile(this._pemCertificationRequestS, this._pemCertificateS,
                    this.privateKeySEncrypted, CertificateType.SIGNING, this.user, encryptionPair,
                    this.symmetricKeyEncrypted);
        } else {
            securityProfileS = this.securityProfileConstructorService
                .createSecurityProfile(this._pemCertificationRequestS, this._pemCertificateS, undefined,
                    CertificateType.SIGNING, this.user, encryptionPair, this.symmetricKeyEncrypted);
        }
        this.securityProfileService.save(securityProfileS).subscribe((result: SecurityProfile) => {
            this.saveDecision = true;
        });
    }

    private encryptionPair(): void {
        this.keysService.generatePublicPrivateKeyPair(false)
            .then((keyPair: CryptoKeyPair) => {
                this.privateKeyE = keyPair.privateKey;
                this.keysService.exportKey(keyPair.publicKey, 'spki')
                    .then((keyBuf: ArrayBuffer) => {
                        this._pemPublicKeyE = this.pemParser.parsePublicKeyPEM(keyBuf);
                        this.encryptedKeyPairGenerated = true;
                    });
            });
    }

    private certificationRequestS(): void {
        let publicKey: CryptoKey;
        this.keysService.generatePublicPrivateKeyPair(true).then((keyPair: CryptoKeyPair) => {
            publicKey = keyPair.publicKey;
            this.privateKeyS = keyPair.privateKey;
            let sequence: Promise<any> = this.certificateRequestGenerationService
                .createPKCS10Internal(this.privateKeyS, publicKey, this.user).then((pkcs10Buffer) => {
                    let pemRequest = this.pemParser.parseCertificateRequestPEM(pkcs10Buffer);
                    this._pemCertificationRequestS = pemRequest;
                    this.certificateService.sign(pemRequest).subscribe((result: string) => {
                        this._pemCertificateS = result;
                        this.certificateGeneratedS = true;
                    });
                }, error => Promise.reject(`Error parsing PKCS#10 into BER: ${error}`));
        });
    }

    private symmetric(): void {
        this.keysService.generateSymmetricKey().then((symmetricKey: CryptoKey) => {
            this.symmetricKey = symmetricKey;
        });
    }

    get pemPublicKeyE(): string {
        return this._pemPublicKeyE
    }

    get pemCertificateS(): string {
        return this._pemCertificateS;
    }

    get pemCertificationRequestS(): string {
        return this._pemCertificationRequestS;
    }
}
