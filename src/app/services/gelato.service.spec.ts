import { TestBed } from '@angular/core/testing';

import { GelatoService } from './gelato.service';

describe('GelatoService', () => {
  let service: GelatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GelatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
