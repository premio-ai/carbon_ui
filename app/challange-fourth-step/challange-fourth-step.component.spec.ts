import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallangeFourthStepComponent } from './challange-fourth-step.component';

describe('ChallangeFourthStepComponent', () => {
  let component: ChallangeFourthStepComponent;
  let fixture: ComponentFixture<ChallangeFourthStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallangeFourthStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallangeFourthStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
