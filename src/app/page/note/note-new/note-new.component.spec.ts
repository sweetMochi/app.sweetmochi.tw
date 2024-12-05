import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNoteNewComponent } from './note-new.component';

describe('AppNoteNewComponent', () => {
  let component: AppNoteNewComponent;
  let fixture: ComponentFixture<AppNoteNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppNoteNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppNoteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
