import {Injectable} from "@angular/core";
import {SecurityProfile} from "../../../domain/model/security/security-profile";
import {SecurityContext} from "../../authentication/security.context.service";
import {JwtSecurityContext} from "../../authentication/jwt/jwt-security-context.service";
import {CryptographicOperations} from "../cryptographic-operations/cryptographic-operations";
/**
 * Created by Viki on 3/1/2017.
 */


@Injectable()
export class ProtocolMessagesReconstructionService {

  private securityProfile: SecurityProfile;

  constructor(private securityContext: JwtSecurityContext, private cryptographicOperations: CryptographicOperations) {
    this.initializeSecurityProfile();
  }

  private initializeSecurityProfile() {
    this.securityProfile = this.securityContext.securityProfile;
    this.securityContext.securityProfileObservable().subscribe((securityProfile: SecurityProfile) => {
      this.securityProfile = securityProfile;
    });
  }

  public constructProtocolMessageOne(jsonMessage: string) {
    let message: {'signature': string, 'object': string, 'data': string, 'hashedData': string} =
        JSON.parse(jsonMessage);
    if (this.cryptographicOperations.hash(message.data) == message.hashedData) {
      console.log("Verifying passed");


    }
  }
}
