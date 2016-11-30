import {Observable, Observer} from "rxjs";
import any = jasmine.any;
/**
 * Created by AKuzmanoski on 21/11/2016.
 */
export class SecurityContext {
  /*private principleObserver: Observer<any>;
  public principleObservable: Observable<any> = Observable.create((observer: Observer<any>) => this.principleObserver = observer);
*/
  constructor() {

  }

  get principal(): any {
    return JSON.parse(localStorage.getItem("auth_principal"));
  }

  set principal(principal: any) {
    localStorage.setItem("auth_principal", JSON.stringify(principal));
    //this.principleObserver.next(principal);
  }

  clearSecurityContext(): void {
    localStorage.removeItem("auth_principal");
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("auth_principal")
  }
}
