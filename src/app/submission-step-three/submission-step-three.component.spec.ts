import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionStepThreeComponent } from './submission-step-three.component';

describe('SubmissionStepThreeComponent', () => {
  let component: SubmissionStepThreeComponent;
  let fixture: ComponentFixture<SubmissionStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
