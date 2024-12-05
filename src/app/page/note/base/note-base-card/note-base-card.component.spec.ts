import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBaseCardComponent } from './note-base-card.component';

describe('NoteBaseCardComponent', () => {
	let component: NoteBaseCardComponent;
	let fixture: ComponentFixture<NoteBaseCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NoteBaseCardComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(NoteBaseCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
