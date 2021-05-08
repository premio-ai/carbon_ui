import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvAcceptedComponent } from './inv-accepted.component';

describe('InvAcceptedComponent', () => {
  let component: InvAcceptedComponent;
  let fixture: ComponentFixture<InvAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
