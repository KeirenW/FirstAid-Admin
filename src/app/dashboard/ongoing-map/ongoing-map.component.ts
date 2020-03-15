import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-ongoing-map',
  templateUrl: './ongoing-map.component.html',
  styleUrls: ['./ongoing-map.component.css']
})
export class OngoingMapComponent implements OnInit {
  public mapDefaultPos: any;
  public userLocations: Observable<any[]>;

  constructor(private firestore: AngularFirestore, private userManager: UserManagerService) {
    this.mapDefaultPos = {
      latitude: 56.458110,
      longitude: -2.982118
    };

    if (!firebase.auth().currentUser) {
      userManager.createAnonymousUser();
    }
    this.userLocations = firestore.collection('users').valueChanges();
  }

  ngOnInit(): void {
  }

}