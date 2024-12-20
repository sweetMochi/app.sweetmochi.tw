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

	it('should emit delete event with id when userDelete is called', () => {
		spyOn(component.delete, 'emit');
		component.item = { id: '123', title: 'Test', content: 'Test content', date: '2023-10-10' };
		component.userDelete();
		expect(component.delete.emit).toHaveBeenCalledWith('123');
	});

	it('should emit error event when userDelete is called with invalid data', () => {
		spyOn(component.error, 'emit');
		component.item = { id: '', title: 'Test', content: 'Test content', date: '2023-10-10' };
		component.userDelete();
		expect(component.error.emit).toHaveBeenCalled();
	});

	it('should call toEditPage with id when userEdit is called', () => {
		spyOn(component, 'toEditPage');
		component.item = { id: '123', title: 'Test', content: 'Test content', date: '2023-10-10' };
		component.userEdit();
		expect(component.toEditPage).toHaveBeenCalledWith('123');
	});

});
