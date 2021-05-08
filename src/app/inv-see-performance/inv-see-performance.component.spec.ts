import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvSeePerformanceComponent } from './inv-see-performance.component';

describe('InvSeePerformanceComponent', () => {
  let component: InvSeePerformanceComponent;
  let fixture: ComponentFixture<InvSeePerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvSeePerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvSeePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
