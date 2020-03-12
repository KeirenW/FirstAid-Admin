import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  public user: IUser;

  constructor() { }
}
