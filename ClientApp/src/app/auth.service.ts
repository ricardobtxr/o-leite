import { Injectable } from '@angular/core';
import auth from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public myToken: any = null;
  public user: Observable<firebase.default.User>;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) {
    this.user = afAuth.authState;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        result.user.getIdToken().then()
          .then((idToken) => {
            this.myToken = idToken;
            // ESTE É O TOKEN JWT QUE VAMOS MANDAR PARA API
            console.log(idToken);
          }).catch(function (error) {
            console.log(error);
          });
      }).catch((error) => {
          console.log(error)
      })
  }

}
