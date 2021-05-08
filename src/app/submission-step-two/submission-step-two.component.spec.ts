import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionStepTwoComponent } from './submission-step-two.component';

describe('SubmissionStepTwoComponent', () => {
  let component: SubmissionStepTwoComponent;
  let fixture: ComponentFixture<SubmissionStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
