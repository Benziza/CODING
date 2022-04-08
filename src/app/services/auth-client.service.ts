import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthClientService {
  constructor(public ngFireAuth: AngularFireAuth) {}

  getAuth() {
    return this.ngFireAuth.authState.pipe(map((auth) => auth));
  }
}
