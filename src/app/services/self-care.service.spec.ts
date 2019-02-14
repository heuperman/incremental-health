import { TestBed } from '@angular/core/testing';

import { SelfCareService } from './self-care.service';

describe('SelfCareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelfCareService = TestBed.get(SelfCareService);
    expect(service).toBeTruthy();
  });
});
