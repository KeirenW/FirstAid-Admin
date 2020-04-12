import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { IEvent } from 'src/app/interfaces/IEvent/ievent';
import { EventService } from 'src/app/services/event/event.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-selected-event',
  templateUrl: './selected-event.component.html',
  styleUrls: ['./selected-event.component.css']
})
export class SelectedEventComponent implements OnInit {
  public eventIdentifier: Observable<any>;
  public event: IEvent;
  public eventForm: FormGroup;

  constructor(private firestore: AngularFirestore, private eventService: EventService, private formBuilder: FormBuilder) {
    this.eventIdentifier = null;
    this.eventForm = this.formBuilder.group({
      caller: '',
      location: '',
      description: '',
      victimName: '',
      victimAge: 0,
      victimGender: ''
    });
  }

  ngOnInit(): void {
    this.eventService.selectedEvent.subscribe(res => {
      if (res !== '') {
        console.log('Getting event...');
        this.eventIdentifier = this.firestore.collection('events').doc(res).valueChanges();

        this.eventIdentifier.subscribe(doc => {
          this.updateEvent(doc);
          this.updateForm();
          console.log(this.event);
        });
      }
    });
  }

  updateEvent(doc) {
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
      },
      Severity: doc.Severity
    };
  }

  updateForm()  {
    this.eventForm.setValue({
      caller: this.event.Caller,
      location: this.event.Location,
      description: this.event.Description,
      victimName: this.event.Victim.Name,
      victimAge: this.event.Victim.Age,
      victimGender: this.event.Victim.Sex
    });
  }

  onUpdateDetails(event) {
    this.event.Caller = event.caller;
    this.event.Location = event.location;
    this.event.Description = event.description;
    this.event.Victim.Name = event.victimName;
    this.event.Victim.Age = event.victimAge;
    this.event.Victim.Sex = event.victimGender;
    this.event.Caller = event.caller;

    this.firestore.collection('events').doc(this.event.UUID).update(this.event);
    alert('Event updated!');
  }

  updateStatus(value) {
    this.event.Status = value;
    this.firestore.collection('events').doc(this.event.UUID).update(this.event);
  }

  updateSeverity(value) {
    this.event.Severity = value;
    this.firestore.collection('events').doc(this.event.UUID).update(this.event);
  }
}
