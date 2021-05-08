import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvChallengeComponent } from './inv-challenge.component';

describe('InvChallengeComponent', () => {
  let component: InvChallengeComponent;
  let fixture: ComponentFixture<InvChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
