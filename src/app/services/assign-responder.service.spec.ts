import { TestBed } from '@angular/core/testing';

import { AssignResponderService } from './assign-responder.service';

describe('AssignResponderService', () => {
  let service: AssignResponderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignResponderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
