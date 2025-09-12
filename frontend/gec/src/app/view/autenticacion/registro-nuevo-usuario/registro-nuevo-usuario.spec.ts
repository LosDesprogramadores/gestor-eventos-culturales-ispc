import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroNuevoUsuario } from './registro-nuevo-usuario';

describe('RegistroNuevoUsuario', () => {
  let component: RegistroNuevoUsuario;
  let fixture: ComponentFixture<RegistroNuevoUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroNuevoUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroNuevoUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
