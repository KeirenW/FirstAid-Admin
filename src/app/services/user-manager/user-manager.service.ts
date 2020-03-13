import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser/iuser';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  private user: IUser;

  constructor(private fireauth: AngularFireAuth) { }

  public setUser(user) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }

  public createAnonymousUser(): Promise<any> {
    return this.fireauth.signInAnonymously();
  }
}
