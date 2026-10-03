import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppYoutubeThumbnailComponent } from './youtube-thumbnail.component';

describe('AppYoutubeThumbnailComponent', () => {
	let component: AppYoutubeThumbnailComponent;
	let fixture: ComponentFixture<AppYoutubeThumbnailComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppYoutubeThumbnailComponent],
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(), // 攔截 HTTP 請求，不會真的連線
				provideRouter([]),
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(AppYoutubeThumbnailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
