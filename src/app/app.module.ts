import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AngularBootstrapToastsModule } from 'angular-bootstrap-toasts';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

import { environment } from 'src/environments/environment';
import { SearchUsersPipe } from './pipes/search-users.pipe';
import { OngoingMapComponent } from './dashboard/ongoing-map/ongoing-map.component';
import { SelectedEventComponent } from './dashboard/selected-event/selected-event.component';
import { AllEventsComponent } from './dashboard/all-events/all-events.component';
import { AssignResponderComponent } from './dashboard/selected-event/assign-responder/assign-responder.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:uuid', component: EditUserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    UsersComponent,
    UserCardComponent,
    EditUserComponent,
    SearchUsersPipe,
    OngoingMapComponent,
    SelectedEventComponent,
    AllEventsComponent,
    AssignResponderComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularBootstrapToastsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // for debugging only
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnRrS4cTyy_qIhqpajqwmVx1BVgzKIr4g'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
