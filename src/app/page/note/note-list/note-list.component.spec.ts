import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNoteListComponent } from './note-list.component';

describe('AppNoteListComponent', () => {
	let component: AppNoteListComponent;
	let fixture: ComponentFixture<AppNoteListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppNoteListComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(AppNoteListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
