import { TestBed } from '@angular/core/testing';

import { RbChillAngularV7Service } from './rb-chill-angular-v7.service';

describe('RbChillAngularV7Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RbChillAngularV7Service = TestBed.get(RbChillAngularV7Service);
    expect(service).toBeTruthy();
  });
});
