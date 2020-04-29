import { Component, OnInit, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';
import { FormControl } from '@angular/forms';
import { ActiveUsersService } from 'src/app/services/activeUsers/active-users.service';

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

  constructor(private fns: AngularFireFunctions, private toast: AngularBootstrapToastsService, public activeUsers: ActiveUsersService) {
    this.distancesCalculated = false;
  }

  async ngOnInit() { }

  assignUser(user) {
    console.log(user);
    const toast = this.toast.showConfirmToast({
      title: `Assign to this event?`,
      text: `User: ${user.firstName} ${user.surname} has been chosen to respond to this event. Is this correct?`,
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
        // Assign event, notify, set active to false
      } // else don't need to do anything
      toastSubscription.unsubscribe();
    });
  }

}
