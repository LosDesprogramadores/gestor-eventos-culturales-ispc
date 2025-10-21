import { TestBed } from '@angular/core/testing';

import { ServiceDatos } from './service-datos';

describe('ServiceDatos', () => {
  let service: ServiceDatos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDatos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
