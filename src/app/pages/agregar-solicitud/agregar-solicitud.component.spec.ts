import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSolicitudComponent } from './agregar-solicitud.component';

describe('AgregarSolicitudComponent', () => {
  let component: AgregarSolicitudComponent;
  let fixture: ComponentFixture<AgregarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
