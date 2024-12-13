import { inject, Injectable } from '@angular/core';
import { WidgetService } from './service/widget.service';
import { HttpService } from './service/http.service';
import { HttpClient } from '@angular/common/http';



/**
 * 底層服務
 */
@Injectable()
export class RootService {


	// https://angular.dev/guide/di/dependency-injection-context
	private injectorWidgetService = inject(WidgetService);
	private injectorHttpService = inject(HttpService);
	private injectorHttpClient = inject(HttpClient);


	/**
	 * Angular 內建 HTTP 功能
	 */
	get http() {
		return this.injectorHttpClient;
	}


	/**
	 * 連線服務
	 */
	get httpService() {
		return this.injectorHttpService;
	}


	/**
	 * 元件服務
	 */
	get widgetService() {
		return this.injectorWidgetService;
	}


}
