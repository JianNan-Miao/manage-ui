import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    // console.log(this.authenticated);

    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }
    // if(!this.keycloak.isUserInRole('admin')){
    //   alert('没权限访问')
    //   this.keycloak.logout()
    // }

    // Get the roles required from the route.
    const requiredRoles = this.keycloak.getUserRoles();


    var b = this.keycloak.isUserInRole('somtest');


    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return true;
  }
}
