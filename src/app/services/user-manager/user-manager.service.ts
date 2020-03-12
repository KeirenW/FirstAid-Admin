import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  private user: IUser;

  constructor() { }

  public setUser(user) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }
}
