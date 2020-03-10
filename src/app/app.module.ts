import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'dispatch', component: DispatchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DispatchComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // for debugging only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
