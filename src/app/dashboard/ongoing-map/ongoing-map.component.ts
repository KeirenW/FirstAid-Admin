import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventService } from 'src/app/services/event/event.service';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-ongoing-map',
  templateUrl: './ongoing-map.component.html',
  styleUrls: ['./ongoing-map.component.css']
})
export class OngoingMapComponent implements OnInit {
  public mapDefaults: any;
  public location: any;

  constructor(private firestore: AngularFirestore, private event: EventService, private ffns: AngularFireFunctions) {
    this.mapDefaults = {
      latitude: 56.458110,
      longitude: -2.982118,
      type: 'satellite'
    };
    this.location = null;
  }

  ngOnInit(): void {
    this.event.selectedEvent.subscribe(res => {
      if (res.length > 0) {
        const test = this.firestore.collection('events').doc(res).valueChanges().subscribe(event => {
          const eventDetails: any = event;
          const eventLocation = eventDetails.Location;
          console.log('Event', event);
          const callable = this.ffns.httpsCallable('getLocation');
          callable({
            key: 'AIzaSyAdm8c2SnqvQGLUjsZCtCDKFNF4rorHeJM',
            location: eventLocation
          }).subscribe(result => {
            this.location = JSON.parse(result);
            this.location = this.location.results[0].geometry.location;
            console.log(this.location);
            test.unsubscribe();
          });

        });
      }
    });
  }

}
