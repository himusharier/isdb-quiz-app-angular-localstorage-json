import { TestBed } from '@angular/core/testing';

import { LoggedinUserService } from './loggedin-user.service';

describe('LoggedinUserService', () => {
  let service: LoggedinUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedinUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
