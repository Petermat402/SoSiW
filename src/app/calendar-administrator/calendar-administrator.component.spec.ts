import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAdministratorComponent } from './calendar-administrator.component';

describe('CalendarAdministratorComponent', () => {
  let component: CalendarAdministratorComponent;
  let fixture: ComponentFixture<CalendarAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
