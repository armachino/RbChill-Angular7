import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbChillAngular7Component } from './rb-chill-angular7.component';

describe('RbChillAngular7Component', () => {
  let component: RbChillAngular7Component;
  let fixture: ComponentFixture<RbChillAngular7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbChillAngular7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbChillAngular7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
