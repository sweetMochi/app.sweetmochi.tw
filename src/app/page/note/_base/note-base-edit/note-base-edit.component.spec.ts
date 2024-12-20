import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';

import { NoteBaseEditComponent } from './note-base-edit.component';

describe('NoteBaseEditComponent', () => {
	let component: NoteBaseEditComponent;
	let fixture: ComponentFixture<NoteBaseEditComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NoteBaseEditComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(NoteBaseEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize form with item data', () => {
		component.item = {
			id: '1',
			title: 'Test Title',
			content: 'Test Content',
			date: '2023-01-01',
			image: 'test.jpg',
			tag: ['tag1', 'tag2']
		};
		component.init();
		expect(component.formGroup.value.title).toBe('Test Title');
		expect(component.formGroup.value.content).toBe('Test Content');
		expect(component.formGroup.value.date).toBe('2023-01-01');
		expect(component.formGroup.value.image).toBe('test.jpg');
		expect(component.formGroup.value.tag).toEqual(['tag1', 'tag2']);
	});

	it('should return form errors', () => {
		const errors = component.formError('title');
		expect(errors).toBeTruthy();
	});

	it('should update date', () => {
		const event = { value: moment('2023-01-01') } as MatDatepickerInputEvent<moment.Moment>;
		component.userDate(event);
		expect(component.formGroup.controls.date.value).toBe('2023-01-01');
	});

	it('should trigger file upload', () => {
		spyOn(component.fileHtml, 'click');
		component.userFile();
		expect(component.fileHtml.click).toHaveBeenCalled();
	});

	it('should send form data', () => {
		spyOn(component.action, 'emit');
		component.formGroup.setValue({
			title: 'Test Title',
			content: 'Test Content',
			date: '2023-01-01',
			image: 'test.jpg',
			tag: ['tag1', 'tag2']
		});
		component.userSend();
		expect(component.action.emit).toHaveBeenCalledWith({
			title: 'Test Title',
			content: 'Test Content',
			date: '2023-01-01',
			image: 'test.jpg',
			tag: ['tag1', 'tag2']
		});
	});

	it('should return request data', () => {
		component.formGroup.setValue({
			title: 'Test Title',
			content: 'Test Content',
			date: '2023-01-01',
			image: 'test.jpg',
			tag: ['tag1', 'tag2']
		});
		const data = component.rqData();
		expect(data).toEqual({
			title: 'Test Title',
			content: 'Test Content',
			date: '2023-01-01',
			image: 'test.jpg',
			tag: ['tag1', 'tag2']
		});
	});

	// it('should select file and set image value', () => {
	// 	const file = new File([''], 'test.jpg');
	// 	const event = { target: { files: [file] } } as unknown as Event;
	// 	const reader = new FileReader();
	// 	spyOn(reader, 'readAsDataURL');
	// 	spyOn(reader, 'onload').and.callFake(() => {
	// 		component.formGroup.controls.image.setValue('data:image/jpeg;base64,');
	// 	});
	// 	component.userSelectFile(event);
	// 	expect(component.formGroup.controls.image.value).toBe('data:image/jpeg;base64,');
	// });

	it('should remove file', () => {
		component.userRemoveFile();
		expect(component.fileHtml.value).toBe('');
		expect(component.formGroup.controls.image.value).toBe('');
	});

	it('should remove tag', () => {
		component.tagList = ['tag1', 'tag2'];
		component.userRemoveTag(0);
		expect(component.tagList).toEqual(['tag2']);
	});

	it('should add tag', () => {
		const event = { value: 'newTag', chipInput: { clear: () => {} } } as MatChipInputEvent;
		component.userAddTag(event);
		expect(component.tagList).toContain('newTag');
	});

	it('should trim empty data', () => {
		const data = {
			title: 'Test Title',
			content: '',
			date: '2023-01-01',
			image: '',
			tag: []
		};
		const trimmedData = component.rqDataTrimEmpty(data);
		expect(trimmedData).toEqual({
			title: 'Test Title',
			date: '2023-01-01',
			content: ''
		});
	});
});
