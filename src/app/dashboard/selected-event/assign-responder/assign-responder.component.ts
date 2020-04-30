import { Component, OnInit, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';
import { ActiveUsersService } from 'src/app/services/activeUsers/active-users.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
        // Assign event to user
        console.log(user);
        this.firestore.collection('users').doc(user.uuid).update({assignedEvent: this.activeUsers.getCurrentEvent().UUID});
        // Send notification
        const callable = this.ffns.httpsCallable('sendNotification');
        callable({
          topic: user.uuid,
          title: `You have been assigned to a \'${this.activeUsers.getCurrentEvent().Severity}\' event!`,
          body: `Please accept or reject this assignment ASAP!`
        }).subscribe(res => {
          console.log(res);
        });
      } // else don't need to do anything
      toastSubscription.unsubscribe();
    });
  }

}
