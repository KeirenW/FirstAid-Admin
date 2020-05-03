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
  private timer: Observable<any>;

  constructor(
    private toast: AngularBootstrapToastsService,
    public activeUsers: ActiveUsersService,
    private firestore: AngularFirestore,
    private ffns: AngularFireFunctions
  ) {
    this.distancesCalculated = false;
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

  // getResponderName() {
  //   console.log('getResponderName() called');
  //   const user: any = this.firestore.collection('users').doc(eventToAssign.Responder).get();
  //   console.log('WTF ', `${user.firstName} ${user.surname}`);
  //   this.assigned =  JSON.stringify(`${user.firstName} ${user.surname}`);
  // }
}
