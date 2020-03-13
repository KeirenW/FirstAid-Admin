import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { UsersComponent } from './users/users.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

import { environment } from 'src/environments/environment';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'dispatch', component: DispatchComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:uuid', component: EditUserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DispatchComponent,
    UsersComponent,
    UserCardComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
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
