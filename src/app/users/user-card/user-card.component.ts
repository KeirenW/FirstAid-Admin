import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: IUser;

  constructor() { }

  ngOnInit(): void {
  }

}

interface IUser {
  email: string;
  firstName: string;
  surname: string;
  uuid: string;
  lastLng: string;
  lastLat: string;
}
