/**
 * Created by AKuzmanoski on 21/11/2016.
 */
export class SecurityContext {
  get principal(): any {
    return JSON.parse(localStorage.getItem("auth_principal"));
  }

  set principal(principal: any) {
    localStorage.setItem("auth_principal", JSON.stringify(principal));
  }

  clearSecurityContext(): void {
    localStorage.removeItem("auth_principal");
  }

  hasPrincipal(): boolean {
    return !!localStorage.getItem("auth_principal")
  }
}
