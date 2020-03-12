import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  private userUUID: string;
  private user: Observable<any>;

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
    this.user.subscribe(res => console.log(res));
  }

}
