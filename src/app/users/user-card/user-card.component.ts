import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser/iuser';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: IUser;
  public selectedUser: IUser;

  constructor() { }

  ngOnInit(): void {
  }

  editUser(user) {
    return null;
  }
}
