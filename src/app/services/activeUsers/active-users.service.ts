import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventService } from '../event/event.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveUsersService {
  private activeUsers;
  private currentEvent;
  public usersOutput = [];

  constructor(private ffns: AngularFireFunctions, private firestore: AngularFirestore, private event: EventService) {
    this.event.subscribeToEvent().subscribe(res => {
      // Event subscription has fired
      this.firestore.collection('events').doc(res).valueChanges().subscribe(eventDetails => {
        this.currentEvent = eventDetails;
        this.refresh();
      });
    });

    // Get currently active users
    this.firestore.collection('users', user => user.where('active', '==', true)).valueChanges().subscribe(res => {
      // Active user subscription has fired
      this.activeUsers = res;
      this.refresh();
    });
  }

  refresh() {
    if (this.currentEvent !== undefined && this.activeUsers !== undefined) {
      // Clear the userOutput array so that responders are not duplicated
      this.usersOutput = [];

      // Foreach active user get the distance
      this.activeUsers.forEach(user => {
        const callable = this.ffns.httpsCallable('getDistance');

        // Call Firebase function to return distance from first aider to event
        callable({
          originLat: user.lastLat,
          originLng: user.lastLng,
          destination: this.currentEvent.Location,
          key: 'AIzaSyAnRrS4cTyy_qIhqpajqwmVx1BVgzKIr4g'
        }).subscribe(res => {
          const details = JSON.parse(res);
          console.log(details);
          this.usersOutput.push({
            name: `${user.firstName} ${user.surname}`,
            distanceValue: details.rows[0].elements[0].distance.value,
            distanceText: details.rows[0].elements[0].distance.text
          });
          console.log(this.usersOutput);
          // Sort by distance (ascending)
          this.usersOutput.sort((user1, user2) => {
            if (user1.distanceValue > user2.distanceValue) { return 1; }
            if (user1.distanceValue < user2.distanceValue) { return -1; }
            return 0;
          });
        });
      });
    }
  }
}
