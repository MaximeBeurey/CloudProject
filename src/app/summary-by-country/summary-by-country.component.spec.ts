import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryByCountryComponent } from './summary-by-country.component';

describe('SummaryByCountryComponent', () => {
  let component: SummaryByCountryComponent;
  let fixture: ComponentFixture<SummaryByCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryByCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
