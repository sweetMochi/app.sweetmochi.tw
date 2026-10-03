import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppNoteListComponent } from './note-list.component';

describe('AppNoteListComponent', () => {
	let component: AppNoteListComponent;
	let fixture: ComponentFixture<AppNoteListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppNoteListComponent],
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(), // 攔截 HTTP 請求，不會真的連線
				provideRouter([]),
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(AppNoteListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => vi.restoreAllMocks())

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
