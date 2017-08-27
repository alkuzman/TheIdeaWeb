import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../domain/model/authentication/user";
import {KeysService} from "../../../core/security-protocols/keys/keys.service";
import {CertificateRequestGenerationService} from "../../../core/security-protocols/certificates/certificates-requests-generation.service";
import {SecurityProfile} from "../../../domain/model/security/security-profile";
import {CertificateService} from "../../../domain/services/certificate/certificate.service";
import {SecurityProfileConstructorService} from "../../../core/security-protocols/constructors/security-profile-constructor.service";
import {CertificateType} from "../../../domain/model/enumerations/certificate-type";
import {SecurityProfileService} from "../../../domain/services/security-profile/security-profile.service";
import {EncryptionPair} from "../../../domain/model/security/encryption-pair";
import {ParserPemService} from "../../../core/security-protocols/parsers/parser-pem.service";
import {MdDialog} from "@angular/material";
import {CryptographicOperations} from "../../../core/security-protocols/cryptographic-operations/cryptographic-operations";
import {SimpleCryptographicOperations} from "../../../core/security-protocols/cryptographic-operations/simple-cryptographic-operations";
import {Observable} from "rxjs/Observable";
import {RedirectService} from "../../../core/navigation/redirect.service";
/**
 * Created by Viki on 2/11/2017.
 */


@Component({
    moduleId: module.id,
    selector: "ideal-activate-page-component",
    templateUrl: "activate-page.component.html",
    styleUrls: ["activate-page.component.scss"]
})
export class ActivatePageComponent implements OnInit {

    user: User;

    constructor(private route: ActivatedRoute,
                private redirectService: RedirectService) {
    }

    ngOnInit(): void {
        this.route.data.subscribe((data: { user: User }) => {
            this.user = data.user;
        });
    }

    continueLogin() {
        const queryParams = {email: this.user.email};
        this.redirectService.login(queryParams);
    }
}
