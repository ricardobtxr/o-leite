import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: SocialUser;

  constructor() { }

  setUser(user: SocialUser) {
    this.user = user;
  }

  getUser(): SocialUser {
    return this.user;
  }

}
