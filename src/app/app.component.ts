import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firstAidAdmin';

  constructor(private fireauth: AngularFireAuth) {
    this.createAnonymousUser();
  }

  createAnonymousUser(): Promise<any> {
    return this.fireauth.signInAnonymously();
  }
}
