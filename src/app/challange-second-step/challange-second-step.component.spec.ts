import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallangeSecondStepComponent } from './challange-second-step.component';

describe('ChallangeSecondStepComponent', () => {
  let component: ChallangeSecondStepComponent;
  let fixture: ComponentFixture<ChallangeSecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallangeSecondStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallangeSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
