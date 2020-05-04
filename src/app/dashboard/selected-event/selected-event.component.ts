import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { IEvent } from 'src/app/interfaces/IEvent/ievent';
import { EventService } from 'src/app/services/event/event.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';
import { AssignResponderService } from 'src/app/services/assign-responder.service';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-selected-event',
  templateUrl: './selected-event.component.html',
  styleUrls: ['./selected-event.component.css']
})
export class SelectedEventComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;
  public eventIdentifier: Observable<any>;
  public event: IEvent;
  public eventForm: FormGroup;
  public searchTerm: string;
  public externalHelp: boolean;
  public closeEventForm: FormGroup;

  constructor(
    private firestore: AngularFirestore,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private toast: AngularBootstrapToastsService,
    private assign: AssignResponderService,
    private ffns: AngularFireFunctions
  ) {
    this.eventIdentifier = null;
    this.eventForm = this.formBuilder.group({
      caller: '',
      location: '',
      description: '',
      victimName: '',
      victimAge: 0,
      victimGender: ''
    });
    this.closeEventForm = this.formBuilder.group({
      reason: ''
    });
  }

  ngOnInit(): void {
    this.eventService.subscribeToEvent().subscribe(res => {
      if (res !== '') {
        this.firestore.collection('events').doc(res).valueChanges().subscribe(event => {
          this.updateEvent(event);
          this.updateForm();
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
      Severity: doc.Severity,
      externalHelp: doc.externalHelp,
      AssignmentState: doc.AssignmentState
    };
    this.assign.checkAssigned(this.event.UUID);
  }

  updateForm() {
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
    this.toast.showSimpleToast({
      title: 'Event updated',
      text: `Event for caller ${this.event.Caller} has been updated.`,
      duration: 3000,
      showProgressLine: true,
      closeByClick: true
    });
  }

  updateStatus(value) {
    this.event.Status = value;
    this.firestore.collection('events').doc(this.event.UUID).update(this.event);
  }

  updateSeverity(value) {
    this.event.Severity = value;
    this.firestore.collection('events').doc(this.event.UUID).update(this.event);
  }

  sendUpdatedInfo() {
    this.firestore.collection('events').doc(this.event.UUID).update(this.event);
    const callable = this.ffns.httpsCallable('sendNotification');
    callable({
      topic: this.event.Responder,
      title: `Details updated!`,
      body: `Updated details have been sent for the event that you have been assigned.`
    }).subscribe(res => {
      this.toast.showSimpleToast({
        title: 'Notification sent!',
        text: 'The assigned first aider for this event has been notified of the updated details provided'
      });
    });
  }

  closeEvent(value) {
    this.updateStatus('Closed');
    this.firestore.collection('events').doc(this.event.UUID).update({ClosedReason: value.reason});
    this.closeModal.nativeElement.click();
  }
}
