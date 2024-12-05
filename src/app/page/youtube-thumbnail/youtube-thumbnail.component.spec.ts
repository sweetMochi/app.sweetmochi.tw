import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppYoutubeThumbnailComponent } from './youtube-thumbnail.component';

describe('AppYoutubeThumbnailComponent', () => {
	let component: AppYoutubeThumbnailComponent;
	let fixture: ComponentFixture<AppYoutubeThumbnailComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppYoutubeThumbnailComponent]
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
