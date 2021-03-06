import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  public mapData: any;
  public updatedDetails: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.mapData = {
      type: 'roadmap',
      lat: null,
      long: null
    };
  }

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
        lastLng: res.lastLng,
        active: res.active
      };

      this.updatedDetails = this.formBuilder.group({
        firstName: this.formData.firstName,
        surname: this.formData.surname,
        email: this.formData.email
      });

      this.mapData.lat = Number(this.formData.lastLat);
      this.mapData.long = Number(this.formData.lastLng);
    });
  }

  onSubmit(value) {
    this.firestore.collection('users').doc(this.formData.uuid).update(value);
  }

  deleteUser() {
    this.firestore.collection('users').doc(this.formData.uuid).delete();
    alert('User deleted');
    this.router.navigateByUrl('/users');
  }
}
