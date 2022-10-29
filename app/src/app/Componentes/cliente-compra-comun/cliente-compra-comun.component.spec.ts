import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCompraComunComponent } from './cliente-compra-comun.component';

describe('ClienteCompraComunComponent', () => {
  let component: ClienteCompraComunComponent;
  let fixture: ComponentFixture<ClienteCompraComunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteCompraComunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteCompraComunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
