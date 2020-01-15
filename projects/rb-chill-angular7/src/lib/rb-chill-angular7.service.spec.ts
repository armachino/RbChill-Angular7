import { TestBed } from '@angular/core/testing';

import { RbChillAngular7Service } from './rb-chill-angular7.service';

describe('RbChillAngular7Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RbChillAngular7Service = TestBed.get(RbChillAngular7Service);
    expect(service).toBeTruthy();
  });
});
