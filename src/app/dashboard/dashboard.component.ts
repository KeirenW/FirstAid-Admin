import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEvent } from '../interfaces/IEvent/ievent';
import { Guid } from 'guid-typescript';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { EventStatus } from '../enums/EventStatus/event-status.enum';
import { Sex } from '../enums/Sex/sex.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;
  public newEvent: IEvent;
  public formErrors: {
    event: boolean,
    victim: boolean
  };
  public newEventForm: FormGroup;

  constructor(private firestore: AngularFirestore, private formBuilder: FormBuilder) {
    this.newEvent = {
      UUID: Guid.create().toString(),
      Timestamp: firebase.firestore.Timestamp.now().toDate(),
      Caller: null,
      Description: null,
      Location: null,
      Status: EventStatus[`New`],
      Victim: {
        Age: null,
        Name: null,
        Sex: null
      },
      Responder: null,
      Severity: null,
      externalHelp: false,
      AssignmentState: null
    };

    this.formErrors = {
      event: false,
      victim: false
    };

    this.newEventForm = this.formBuilder.group({
      caller: '',
      location: '',
      description: '',
      uuid: Guid.create().toString(),
      timestamp: firebase.firestore.Timestamp.now().toDate(),
      victimName: '',
      victimAge: 0,
      victimGender: ''
    });
  }

  ngOnInit(): void {
  }

  createEvent(value) {
    this.newEvent = {
      Timestamp: value.timestamp,
      UUID: value.uuid,
      Caller: value.caller,
      Description: value.description,
      Location: value.location,
      Status: this.newEvent.Status,
      Victim: {
        Name: value.victimName,
        Age: value.victimAge,
        Sex: value.victimGender
      },
      Responder: '',
      Severity: 'Mild',
      externalHelp: false,
      AssignmentState: null
    };

    if (this.inputValidation()) {
      // Add to firestore
      this.firestore.collection('events').doc(this.newEvent.UUID).set(this.newEvent);
      this.closeModal.nativeElement.click();
      window.location.reload();
    }
  }

  inputValidation(): boolean {
    if (this.newEvent.Caller.length === 0 || this.newEvent.Description.length === 0 || this.newEvent.Location.length === 0) {
      this.formErrors.event = true;
      console.log('Event error');
    } else {
      this.formErrors.event = false;
    }

    if (this.newEvent.Victim.Name.length === 0 || this.newEvent.Victim.Age < 1 || this.newEvent.Victim.Sex === Sex.Error) {
      console.log('VICTIM :: ', this.newEvent.Victim);
      this.formErrors.victim = true;
      console.log('Victim Error');
    } else {
      this.formErrors.victim = false;
    }

    if (!this.formErrors.event && !this.formErrors.victim) {
      // Input is good
      return true;
    }
    return false;
  }
}
