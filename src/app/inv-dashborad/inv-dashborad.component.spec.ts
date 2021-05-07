import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvDashboradComponent } from './inv-dashborad.component';

describe('InvDashboradComponent', () => {
  let component: InvDashboradComponent;
  let fixture: ComponentFixture<InvDashboradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvDashboradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
