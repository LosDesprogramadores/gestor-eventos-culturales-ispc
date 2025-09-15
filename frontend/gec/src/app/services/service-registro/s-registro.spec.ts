import { TestBed } from '@angular/core/testing';

import { SRegistro } from './s-registro';

describe('SRegistro', () => {
  let service: SRegistro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SRegistro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
