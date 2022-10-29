import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClientesComponent } from './top-clientes.component';

describe('TopClientesComponent', () => {
  let component: TopClientesComponent;
  let fixture: ComponentFixture<TopClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
