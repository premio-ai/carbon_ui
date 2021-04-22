import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallangeFirstStepComponent } from './challange-first-step.component';

describe('ChallangeFirstStepComponent', () => {
  let component: ChallangeFirstStepComponent;
  let fixture: ComponentFixture<ChallangeFirstStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallangeFirstStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallangeFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
