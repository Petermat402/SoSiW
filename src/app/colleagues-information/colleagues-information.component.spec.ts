import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColleaguesInformationComponent } from './colleagues-information.component';

describe('ColleaguesInformationComponent', () => {
  let component: ColleaguesInformationComponent;
  let fixture: ComponentFixture<ColleaguesInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColleaguesInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColleaguesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
