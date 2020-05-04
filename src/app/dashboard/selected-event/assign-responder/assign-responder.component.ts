import { Component, OnInit, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';
import { ActiveUsersService } from 'src/app/services/activeUsers/active-users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { timer, Observable } from 'rxjs';

@Component({
  selector: 'app-assign-responder',
  templateUrl: './assign-responder.component.html',
  styleUrls: ['./assign-responder.component.css']
})
export class AssignResponderComponent implements OnInit {
  public searchTerm: string;
  @Input() selectedEvent;
  public usersWithDistance = [];
  public userCount = 9999;
  public distancesCalculated: boolean;
  private status: boolean;

  constructor(
    private toast: AngularBootstrapToastsService,
    public activeUsers: ActiveUsersService,
    private firestore: AngularFirestore,
    private ffns: AngularFireFunctions
  ) {
    this.distancesCalculated = false;
    this.status = null;
  }

  async ngOnInit() { }

  assignUser(user) {
    const eventToAssign = this.selectedEvent;

    console.log(user);
    const toast = this.toast.showConfirmToast({
      title: `Assign to this event?`,
      text: `User: ${user.name} has been chosen to respond to this event. Is this correct?`,
      duration: 10000,
      pauseDurationOnMouseEnter: true,
      showProgressLine: true,
      toolbarItems: {
        actionButton: {
          text: 'Confirm',
          class: 'btn btn-success btn-sm',
          visible: true
        },
        cancelButton: {
          text: 'Cancel',
          class: 'btn btn-danger btn-sm',
          visible: true
        }
      }
    });
    const toastSubscription = toast.ConfirmationResult$.subscribe(value => {
      console.log(`Toast confirm: ${value}`);
      if (value === true) {
        // create doc in assigned collection with UUID and accepted bool
        console.log(user);

        // Assign to user in the document
        this.firestore.collection('users').doc(user.uuid).update({
          assignedEvent: {
            uuid: eventToAssign.UUID,
            timestamp: new Date()
          }
        });

        this.firestore.collection('events').doc(this.selectedEvent.UUID).update({ AssignmentState: 1 });

        // Send notification to assigned user
        const callable = this.ffns.httpsCallable('sendNotification');
        callable({
          topic: user.uuid,
          title: `You have been assigned to a \'${this.activeUsers.getCurrentEvent().Severity}\' event!`,
          body: `Please accept or reject this assignment ASAP!`
        }).subscribe(res => {
          // Once notification sent
        });

      } // else don't need to do anything
      toastSubscription.unsubscribe();
    });
  }

  reAssign() {
    this.firestore.collection('events').doc(this.selectedEvent.UUID).update({
      Responder: null,
      AssignmentState: null
    }
    );

    // tslint:disable-next-line: max-line-length
    const test = this.firestore.collection('users', query => query.where('assignedEvent.uuid', '==', `${this.selectedEvent.UUID}`)).valueChanges();

    const assignedUser = test.subscribe(res => {
      const user: any = res[0];
      if (user.uuid !== undefined) {
        this.firestore.collection('users').doc(user.uuid).update({
          assignedEvent: {
            uuid: null,
            timestamp: null
          }
        });
        assignedUser.unsubscribe();
      }
    });
  }
}
