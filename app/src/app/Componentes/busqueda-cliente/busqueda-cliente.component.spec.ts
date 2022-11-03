import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaClienteComponent } from './busqueda-cliente.component';

describe('BusquedaClienteComponent', () => {
  let component: BusquedaClienteComponent;
  let fixture: ComponentFixture<BusquedaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
