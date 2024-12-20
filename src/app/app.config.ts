import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { noteInterceptor } from '../root/interceptor/note.interceptor';
import { apiInterceptor } from '../root/interceptor/api.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(
			withInterceptors([
				apiInterceptor,
				noteInterceptor,
			]),
		),
		provideAnimationsAsync(),
	]
};
