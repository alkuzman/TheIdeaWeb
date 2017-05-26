import {Observable, Subject} from "rxjs";
/**
 * Created by AKuzmanoski on 21/11/2016.
 */
export class SecurityContext {
  private principleChanged: Subject<any> = new Subject<any>();
  //private securityProfileEncryptionChanged: Subject<any> = new Subject<any>();
  //private securityProfileSigningChanged: Subject<any> = new Subject<any>();
  private securityProfileChanged: Subject<any> = new Subject<any>();

  constructor() {
    this.principleChanged.next(this.principal);
    this.securityProfileChanged.next(this.securityProfile);
    //this.securityProfileEncryptionChanged.next(this.securityProfileEncryption);
    //this.securityProfileSigningChanged.next(this.securityProfileSigning);
  }

  get principal(): any {
    return JSON.parse(localStorage.getItem("auth_principal"));
  }

  set principal(principal: any) {
    localStorage.setItem("auth_principal", JSON.stringify(principal));
    this.principleChanged.next(principal);
  }

  principalObservable(): Observable<any> {
    return this.principleChanged.asObservable();
  }

  get securityProfile(): any {
    return JSON.parse(localStorage.getItem("security_profile"));
  }

  set securityProfile(securityProfile: any) {
    localStorage.setItem("security_profile", JSON.stringify(securityProfile));
    this.securityProfileChanged.next(securityProfile);
  }

  securityProfileObservable(): Observable<any> {
    return this.securityProfileChanged.asObservable();
  }

  /*
  get securityProfileEncryption(): any {
    return JSON.parse(localStorage.getItem("security_profile_encryption"));
  }

  set securityProfileEncryption(securityProfileEncryption: any) {
    localStorage.setItem("security_profile_encryption", JSON.stringify(securityProfileEncryption));
    this.securityProfileEncryptionChanged.next(securityProfileEncryption);
  }

  securityProfileEncryptionObservable(): Observable<any> {
    return this.securityProfileEncryptionChanged.asObservable();
  }

  get securityProfileSigning(): any {
    return JSON.parse(localStorage.getItem("security_profile_encryption"));
  }

  set securityProfileSigning(securityProfileSigning: any) {
    localStorage.setItem("security_profile_signing", JSON.stringify(securityProfileSigning));
    this.securityProfileEncryptionChanged.next(securityProfileSigning);
  }

  securityProfileSigningObservable(): Observable<any> {
    return this.securityProfileSigningChanged.asObservable();
  }
   */

  clearSecurityContext(): void {
    localStorage.removeItem("auth_principal");
    localStorage.removeItem("security_profile");
    //localStorage.removeItem("security_profile_encryption");
    //localStorage.removeItem("security_profile_signing");
    this.principleChanged.next(null);
    this.securityProfileChanged.next(null);
    //this.securityProfileEncryptionChanged.next(null);
    //this.securityProfileSigningChanged.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("auth_principal")
  }
}
