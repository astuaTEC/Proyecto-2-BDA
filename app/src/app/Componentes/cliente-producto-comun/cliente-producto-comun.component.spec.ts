import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteProductoComunComponent } from './cliente-producto-comun.component';

describe('ClienteProductoComunComponent', () => {
  let component: ClienteProductoComunComponent;
  let fixture: ComponentFixture<ClienteProductoComunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteProductoComunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteProductoComunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
