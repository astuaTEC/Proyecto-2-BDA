import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMarcasComponent } from './top-marcas.component';

describe('TopMarcasComponent', () => {
  let component: TopMarcasComponent;
  let fixture: ComponentFixture<TopMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMarcasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
