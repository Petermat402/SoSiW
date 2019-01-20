import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGradeModalComponent } from './edit-grade-modal.component';

describe('EditGradeModalComponent', () => {
  let component: EditGradeModalComponent;
  let fixture: ComponentFixture<EditGradeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGradeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGradeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
