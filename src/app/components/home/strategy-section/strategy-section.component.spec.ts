/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StrategySectionComponent } from './strategy-section.component';

describe('StrategySectionComponent', () => {
  let component: StrategySectionComponent;
  let fixture: ComponentFixture<StrategySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
