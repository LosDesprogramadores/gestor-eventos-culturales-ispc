import { TestBed } from '@angular/core/testing';

import { SEvento } from './s-evento';

describe('SEvento', () => {
  let service: SEvento;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SEvento);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
