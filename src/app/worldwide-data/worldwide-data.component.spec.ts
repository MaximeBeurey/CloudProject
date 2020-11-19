import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldwideDataComponent } from './worldwide-data.component';

describe('WorldwideDataComponent', () => {
  let component: WorldwideDataComponent;
  let fixture: ComponentFixture<WorldwideDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldwideDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldwideDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
