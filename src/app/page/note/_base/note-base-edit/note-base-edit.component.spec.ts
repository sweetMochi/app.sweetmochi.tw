import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { provideRouter } from '@angular/router';
import moment from 'moment';

import { NoteBaseEditComponent } from './note-base-edit.component';

describe('NoteBaseEditComponent', () => {
	let component: NoteBaseEditComponent;
	let fixture: ComponentFixture<NoteBaseEditComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NoteBaseEditComponent],
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(), // 攔截 HTTP 請求，不會真的連線
				provideRouter([]),
			]
		}).compileComponents();

		fixture = TestBed.createComponent(NoteBaseEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => vi.restoreAllMocks())

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
		vi.spyOn(component.fileHtml, 'click')
		component.userFile();
		expect(component.fileHtml.click).toHaveBeenCalled();
	});

	it('should send form data', () => {
		vi.spyOn(component.action, 'emit').mockImplementation(() => { });
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

	it('should select file and set image value', async () => {
		const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
		// 使用真實的 input 元素，才能通過 instanceof HTMLInputElement 判斷
		const input = document.createElement('input');
		input.type = 'file';
		Object.defineProperty(input, 'files', { value: [file] });
		const event = { target: input } as unknown as Event;

		component.userSelectFile(event);

		// FileReader 為非同步讀取，等待 onload 寫入表單
		await vi.waitFor(() => {
			expect(component.formGroup.controls.image.value).toBe('data:image/jpeg;base64,dGVzdA==');
		});
	});

	it('should remove file', () => {
		component.userRemoveFile();
		expect(component.fileHtml.value).toBe('');
		expect(component.formGroup.controls.image.value).toBe('');
	});

	it('should remove tag', () => {
		component.formGroup.setValue({
			title: 'Test Title',
			content: 'Test Content',
			date: '2023-01-01',
			image: 'test.jpg',
			tag: ['tag1', 'tag2']
		});

		component.userRemoveTag(0);
		expect(component.formGroup.controls.tag.value).toEqual(['tag2']);
	});

	it('should add tag', () => {
		const event = { value: 'newTag', chipInput: { clear: () => { } } } as MatChipInputEvent;
		component.userAddTag(event);
		expect(component.formGroup.controls.tag.value).toContain('newTag');
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
		});
	});
});
