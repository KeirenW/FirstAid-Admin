import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AssignResponderService {
  public userAssigned;

  constructor(private firestore: AngularFirestore) { }

  checkAssigned(uuid) {
    const event: any = this.firestore.collection('events').doc(uuid).get();
    if (event.Responder !== '') {
      console.log();
    }
  }
}
