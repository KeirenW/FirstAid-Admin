import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingMapComponent } from './ongoing-map.component';

describe('OngoingMapComponent', () => {
  let component: OngoingMapComponent;
  let fixture: ComponentFixture<OngoingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
