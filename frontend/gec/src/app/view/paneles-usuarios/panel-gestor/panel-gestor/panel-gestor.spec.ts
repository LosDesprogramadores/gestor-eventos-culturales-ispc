import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelGestor } from './panel-gestor';

describe('PanelGestor', () => {
  let component: PanelGestor;
  let fixture: ComponentFixture<PanelGestor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelGestor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelGestor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
