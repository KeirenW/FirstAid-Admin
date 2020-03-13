import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser/iuser';
import { UserManagerService } from 'src/app/services/user-manager/user-manager.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: IUser;
  public selectedUser: IUser;

  constructor(private userManager: UserManagerService) { }

  ngOnInit(): void {
  }

  editUser(user) {
    this.userManager.setUser(user);
    // Navigate to user view
  }
}
