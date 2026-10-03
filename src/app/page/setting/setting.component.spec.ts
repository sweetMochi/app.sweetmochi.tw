import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppSettingComponent } from './setting.component';

describe('AppSettingComponent', () => {
	let component: AppSettingComponent;
	let fixture: ComponentFixture<AppSettingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppSettingComponent],
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(), // 攔截 HTTP 請求，不會真的連線
				provideRouter([]),
			]

		})
			.compileComponents();

		fixture = TestBed.createComponent(AppSettingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
