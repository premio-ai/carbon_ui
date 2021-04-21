import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallangePageComponent } from './challange-page.component';

describe('ChallangePageComponent', () => {
  let component: ChallangePageComponent;
  let fixture: ComponentFixture<ChallangePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallangePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallangePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
