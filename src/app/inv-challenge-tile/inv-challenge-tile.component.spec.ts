import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvChallengeTileComponent } from './inv-challenge-tile.component';

describe('InvChallengeTileComponent', () => {
  let component: InvChallengeTileComponent;
  let fixture: ComponentFixture<InvChallengeTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvChallengeTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvChallengeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
