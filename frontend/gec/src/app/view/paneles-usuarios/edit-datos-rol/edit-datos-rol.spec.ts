import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDatosRol } from './edit-datos-rol';

describe('EditDatosRol', () => {
  let component: EditDatosRol;
  let fixture: ComponentFixture<EditDatosRol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDatosRol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDatosRol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
