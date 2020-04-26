import { Component, OnInit, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-assign-responder',
  templateUrl: './assign-responder.component.html',
  styleUrls: ['./assign-responder.component.css']
})
export class AssignResponderComponent implements OnInit {
  public searchTerm: string;
  @Input() activeUsers;
  @Input() selectedEvent;
  public usersWithDistance = [];
  public userCount = 9999;
  public distancesCalculated: boolean;

  constructor(private fns: AngularFireFunctions) {
    this.distancesCalculated = false;
  }

  async ngOnInit() {
    this.calculateDistances();
  }

  calculateDistances() {
    const baseURL = 'https://us-central1-test-f6dc6.cloudfunctions.net/getDistance';

    this.activeUsers.subscribe(res => {
      this.userCount = res.length;
      console.log('UserCount = ', this.userCount);
      res.forEach(user => {
        const lat = user.lastLat;
        const long = user.lastLng;

        const callable = this.fns.httpsCallable('getDistance');
        callable({
          originLat: lat,
          originLng: long,
          destination: this.selectedEvent.Location,
          key: 'AIzaSyAnRrS4cTyy_qIhqpajqwmVx1BVgzKIr4g'
        }).subscribe(result => {
          result = JSON.parse(result);

          user.distanceText = result.rows[0].elements[0].distance.text;
          user.distanceValue = result.rows[0].elements[0].distance.value;

          this.userCount = --this.userCount;
          console.log('UserCount = ', this.userCount);
          this.usersWithDistance.push(user);

          // Sort by closes to furthest
          this.usersWithDistance.sort((user1, user2) => {
            if (user1.distanceValue > user2.distanceValue) { return 1; }
            if (user1.distanceValue < user2.distanceValue) { return -1; }
            return 0;
          });

          if (this.userCount === 0) {
            this.distancesCalculated = true;
          }
          console.log(user.distanceText, ' :: ' , user.distanceValue);
        });
      });
    });
  }

  logValue() {
    console.log(this.distancesCalculated);
    console.log(this.usersWithDistance);
  }

}
