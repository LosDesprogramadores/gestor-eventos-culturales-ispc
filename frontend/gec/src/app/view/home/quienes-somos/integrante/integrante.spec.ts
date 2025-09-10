import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Integrante } from './integrante';

describe('Integrante', () => {
  let component: Integrante;
  let fixture: ComponentFixture<Integrante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Integrante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Integrante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
