import {Injectable} from "@angular/core";
import {SecurityProfile} from "../../../domain/model/security/security-profile";
import {SecurityContext} from "../../authentication/security.context.service";
/**
 * Created by Viki on 3/1/2017.
 */


@Injectable()
export class ProtocolMessagesConstructorService {

  private securityProfile: SecurityProfile;

  constructor(private securityContext: SecurityContext) {
    this.initializeSecurityProfile();
  }

  private initializeSecurityProfile() {
    this.securityProfile = this.securityContext.securityProfile;
    this.securityContext.securityProfileObservable().subscribe((securityProfile: SecurityProfile) => {
      this.securityProfile = securityProfile;
    });
  }

  public constructProtocolMessageOne() {

  }
}
