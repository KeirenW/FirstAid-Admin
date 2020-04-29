import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {
  events: Observable<any[]>;

  constructor(private firestore: AngularFirestore, private eventService: EventService) {
    this.events = this.firestore.collection('events', event => event.where('Status', 'in', ['OnGoing', 'New'])).valueChanges();
  }

  ngOnInit(): void {
  }

  changeEvent(value) {
    this.eventService.setCurrentEvent(value);
  }
}
