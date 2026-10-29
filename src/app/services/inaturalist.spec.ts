import { TestBed } from '@angular/core/testing';
import { Inaturalist } from './inaturalist';

describe('Inaturalist', () => {
  let service: Inaturalist;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inaturalist);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
