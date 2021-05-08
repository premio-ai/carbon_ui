import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvModelViewComponent } from './inv-model-view.component';

describe('InvModelViewComponent', () => {
  let component: InvModelViewComponent;
  let fixture: ComponentFixture<InvModelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvModelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvModelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
