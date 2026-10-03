import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppNotePageComponent } from './note-page.component';

describe('AppNotePageComponent', () => {
	let component: AppNotePageComponent;
	let fixture: ComponentFixture<AppNotePageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppNotePageComponent],
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(), // 攔截 HTTP 請求，不會真的連線
				provideRouter([]),
			]
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
