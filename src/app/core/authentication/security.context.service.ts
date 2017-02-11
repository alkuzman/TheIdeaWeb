import {Observable, Subject} from "rxjs";
import any = jasmine.any;
/**
 * Created by AKuzmanoski on 21/11/2016.
 */
export class SecurityContext {
  private principleChanged: Subject<any> = new Subject<any>();

  constructor() {
    this.principleChanged.next(this.principal);
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

  clearSecurityContext(): void {
    localStorage.removeItem("auth_principal");
    this.principleChanged.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("auth_principal")
  }
}
