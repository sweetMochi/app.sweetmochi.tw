import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBaseEditComponent } from './note-base-edit.component';

describe('NoteBaseEditComponent', () => {
	let component: NoteBaseEditComponent;
	let fixture: ComponentFixture<NoteBaseEditComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NoteBaseEditComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(NoteBaseEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
