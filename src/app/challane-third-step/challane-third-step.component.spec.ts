import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallaneThirdStepComponent } from './challane-third-step.component';

describe('ChallaneThirdStepComponent', () => {
  let component: ChallaneThirdStepComponent;
  let fixture: ComponentFixture<ChallaneThirdStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallaneThirdStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallaneThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
