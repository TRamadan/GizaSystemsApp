/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TalentSnapShotComponent } from './talent-snap-shot.component';

describe('TalentSnapShotComponent', () => {
  let component: TalentSnapShotComponent;
  let fixture: ComponentFixture<TalentSnapShotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentSnapShotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentSnapShotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
