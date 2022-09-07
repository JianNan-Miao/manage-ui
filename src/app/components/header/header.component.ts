import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public username:string;

  constructor(private keycloak: KeycloakService) { }

  async ngOnInit(): Promise<void> {
    let usermsg = await this.keycloak.loadUserProfile();
    console.log(usermsg);
    this.username=usermsg.username;
  }


  logout() {
    // localStorage.clear();
    this.keycloak.logout();
  }

}
