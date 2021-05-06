import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelReportComponent } from './model-report.component';

describe('ModelReportComponent', () => {
  let component: ModelReportComponent;
  let fixture: ComponentFixture<ModelReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
