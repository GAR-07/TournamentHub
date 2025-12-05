import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsPage } from './tournaments-page';

describe('TournamentsPage', () => {
  let component: TournamentsPage;
  let fixture: ComponentFixture<TournamentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
