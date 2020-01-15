import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbChillAngularV7Component } from './rb-chill-angular-v7.component';

describe('RbChillAngularV7Component', () => {
  let component: RbChillAngularV7Component;
  let fixture: ComponentFixture<RbChillAngularV7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbChillAngularV7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbChillAngularV7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
