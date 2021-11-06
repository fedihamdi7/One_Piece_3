import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashRespoComponent } from './dash-respo.component';

describe('DashRespoComponent', () => {
  let component: DashRespoComponent;
  let fixture: ComponentFixture<DashRespoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashRespoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashRespoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
