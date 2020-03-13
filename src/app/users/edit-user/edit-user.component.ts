import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, reduce } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { IUser } from 'src/app/interfaces/IUser/iuser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  private user: Observable<any>;
  public formData: IUser;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    /**
     *  Retrieve user data from database by their UUID.
     *  Using ParamMap to get UUID from activated route.
     */
    this.user = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.firestore.collection('users').doc(params.get('uuid')).valueChanges()
      )
    );
    this.user.subscribe(res => {
      this.formData = {
        uuid: res.uuid,
        email: res.email,
        firstName: res.firstName,
        surname: res.surname,
        lastLat: res.lastLat,
        lastLng: res.lastLng
      };
    });
  }

}
