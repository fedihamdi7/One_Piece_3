import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClubsDetailsComponent } from './all-clubs-details.component';

describe('AllClubsDetailsComponent', () => {
  let component: AllClubsDetailsComponent;
  let fixture: ComponentFixture<AllClubsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllClubsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClubsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
