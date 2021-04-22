import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallangeTileComponent } from './challange-tile.component';

describe('ChallangeTileComponent', () => {
  let component: ChallangeTileComponent;
  let fixture: ComponentFixture<ChallangeTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallangeTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallangeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
