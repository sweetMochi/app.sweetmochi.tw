import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoteBaseCardComponent } from './note-base-card.component';


describe('NoteBaseCardComponent', () => {
	let component: NoteBaseCardComponent;
	let fixture: ComponentFixture<NoteBaseCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NoteBaseCardComponent],
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(), // 攔截 HTTP 請求，不會真的連線
				provideRouter([]),
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(NoteBaseCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		// 模擬使用者直接按下確認
		vi.spyOn(component.widgetService, 'popConfirm').mockImplementation((_content, action) => action())
		// 錯誤情境會呼叫 snackBar，避免真的顯示提示
		vi.spyOn(component.widgetService, 'snackBar').mockImplementation(() => { })
	});

	afterEach(() => vi.restoreAllMocks())

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit delete event with id when userDelete is called', () => {
		vi.spyOn(component.delete, 'emit')
		component.item = { id: '123', title: 'Test', content: 'Test content', date: '2023-10-10' };
		component.userDelete();
		expect(component.delete.emit).toHaveBeenCalledWith('123');
	});

	it('should emit error event when userDelete is called with invalid data', () => {
		vi.spyOn(component.error, 'emit')
		component.item = { id: '', title: 'Test', content: 'Test content', date: '2023-10-10' };
		component.userDelete();
		expect(component.error.emit).toHaveBeenCalled();
	});

	it('should call toEditPage with id when userEdit is called', () => {
		vi.spyOn(component, 'toEditPage').mockImplementation(() => { })
		component.item = { id: '123', title: 'Test', content: 'Test content', date: '2023-10-10' };
		component.userEdit();
		expect(component.toEditPage).toHaveBeenCalledWith('123');
	});

});
