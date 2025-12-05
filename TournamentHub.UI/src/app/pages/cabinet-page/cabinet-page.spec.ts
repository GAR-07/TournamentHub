import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetPage } from './cabinet-page';

describe('CabinetPage', () => {
  let component: CabinetPage;
  let fixture: ComponentFixture<CabinetPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinetPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
