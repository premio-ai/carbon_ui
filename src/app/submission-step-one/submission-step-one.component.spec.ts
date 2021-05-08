import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionStepOneComponent } from './submission-step-one.component';

describe('SubmissionStepOneComponent', () => {
  let component: SubmissionStepOneComponent;
  let fixture: ComponentFixture<SubmissionStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
