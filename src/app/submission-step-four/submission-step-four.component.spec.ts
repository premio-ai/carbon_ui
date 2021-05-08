import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionStepFourComponent } from './submission-step-four.component';

describe('SubmissionStepFourComponent', () => {
  let component: SubmissionStepFourComponent;
  let fixture: ComponentFixture<SubmissionStepFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionStepFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
