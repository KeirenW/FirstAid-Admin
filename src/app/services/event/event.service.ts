import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private event: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly selectedEvent: Observable<string> = this.event.asObservable();

  constructor() { }

  setCurrentEvent(value: string) {
    this.event.next(value);
  }
}
