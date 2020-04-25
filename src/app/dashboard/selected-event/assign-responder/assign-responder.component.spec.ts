import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignResponderComponent } from './assign-responder.component';

describe('AssignResponderComponent', () => {
  let component: AssignResponderComponent;
  let fixture: ComponentFixture<AssignResponderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignResponderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignResponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
