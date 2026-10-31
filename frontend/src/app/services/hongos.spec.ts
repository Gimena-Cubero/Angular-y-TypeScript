import { TestBed } from '@angular/core/testing';
import { Hongos } from './hongos';

describe('Hongos', () => {
  let service: Hongos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hongos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
