import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleHongo } from './detalle-hongo';

describe('DetalleHongo', () => {
  let component: DetalleHongo;
  let fixture: ComponentFixture<DetalleHongo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleHongo],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleHongo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
