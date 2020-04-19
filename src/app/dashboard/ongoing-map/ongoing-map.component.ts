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
  public mapDefaults: any;
  public userLocations: Observable<any[]>;

  constructor(private firestore: AngularFirestore, private userManager: UserManagerService) {
    this.mapDefaults = {
      latitude: 56.458110,
      longitude: -2.982118,
      type: 'satellite'
    };

    // if (!firebase.auth().currentUser) {
    //   userManager.createAnonymousUser();
    // }
    // this.userLocations = firestore.collection('users').valueChanges();
  }

  ngOnInit(): void {
  }

}
