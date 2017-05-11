import {Injectable} from "@angular/core";
import {SecurityProfile} from "../../domain/model/security/security-profile";
import {Observable} from "rxjs";
import {KeysService} from "./keys/keys.service";
import {ParserPemService} from "./parsers/parser-pem.service";
import {SimpleSecurityProfile} from "../../domain/model/security/simple-security-profile";
import {ProtocolSession} from "../../domain/model/security/protocol-session";
import {UserService} from "../../domain/services/user/user.service";
/**
 * Created by Viki on 2/10/2017.
 */

@Injectable()
export class HelperService {

    constructor(private userService: UserService) {
    }

    public getEncryptedSessionKeyForAuthenticatedUser(protocolSession: ProtocolSession): string {
        if (protocolSession.participantOneSessionData.participant.email == this.userService.getAuthenticatedUser().email) {
            return protocolSession.participantOneSessionData.sessionKeyEncrypted;
        } else if (protocolSession.participantTwoSessionData.participant.email == this.userService.getAuthenticatedUser().email) {
            return protocolSession.participantTwoSessionData.sessionKeyEncrypted;
        }
    }

    public equal(buf1, buf2) {
        if (buf1.byteLength != buf2.byteLength) return false;
        var dv1 = new Uint8Array(buf1);
        var dv2 = new Uint8Array(buf2);
        for (var i = 0; i != buf1.byteLength; i++) {
            if (dv1[i] != dv2[i]) return false;
        }
        return true;
    }
}
