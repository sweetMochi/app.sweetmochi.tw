import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNotePageComponent } from './note-page.component';

describe('AppNotePageComponent', () => {
	let component: AppNotePageComponent;
	let fixture: ComponentFixture<AppNotePageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppNotePageComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(AppNotePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
