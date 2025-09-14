import { TestBed } from '@angular/core/testing';

import { ServiceQuienesSomos } from './service-quienes-somos';

describe('ServiceQuienesSomos', () => {
  let service: ServiceQuienesSomos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceQuienesSomos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
