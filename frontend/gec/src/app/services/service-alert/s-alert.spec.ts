import { TestBed } from '@angular/core/testing';

import { SAlert } from './s-alert';

describe('SAlert', () => {
  let service: SAlert;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SAlert);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
