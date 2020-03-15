import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

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


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
    SelectedEventComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
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
