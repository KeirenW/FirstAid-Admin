import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { IEvent } from 'src/app/interfaces/IEvent/ievent';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-selected-event',
  templateUrl: './selected-event.component.html',
  styleUrls: ['./selected-event.component.css']
})
export class SelectedEventComponent implements OnInit {
  public uuid: Observable<any>;
  public event: IEvent;

  constructor(private firestore: AngularFirestore, private eventService: EventService) {
    this.uuid = null;
  }

  ngOnInit(): void {
    this.eventService.selectedEvent.subscribe(res => {
      if (res !== '') {
        console.log('Getting event...');
        this.uuid = this.firestore.collection('events').doc(res).valueChanges();

        this.uuid.subscribe(doc => {
          console.log('uuid updated');
          this.event = {
            Timestamp: doc.Timestamp,
            UUID: doc.UUID,
            Caller: doc.Caller,
            Location: doc.Location,
            Description: doc.Description,
            Status: doc.Status,
            Responder: doc.Responder,
            Victim: {
              Name: doc.Victim.Name,
              Age: doc.Victim.Age,
              Sex: doc.Victim.Sex
            }
          };
          console.log(this.event);
        });
      }
    });
  }

}
