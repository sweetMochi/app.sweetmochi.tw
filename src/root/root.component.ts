import { Directive, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './service/http.service';
import { AppLocal } from './method/local';
import { WidgetService } from './service/widget.service';


/**
 * 底層功能
 */
@Directive()
export abstract class RootComponent implements OnInit {
	// https://angular.dev/guide/di/dependency-injection-context
	private injectorHttpService = inject(HttpService);
	private injectorWidgetService = inject(WidgetService);
	private injectorRouter = inject(Router);
	private injectorRoute = inject(ActivatedRoute);

	/**
	 * 不使用 constructor injection 避免繼承時需使用到 super 初始化
	 */

	ngOnInit(): void {
		this.init();
	}


	/**
	 * 繼承的子類別都必須使用 init()
	 */
	abstract init(): void;

	get router() { return this.injectorRouter }
	get route() { return this.injectorRoute }


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


	/**
	 * 本地儲存服務
	 */
	get local() {
		return AppLocal;
	}


}
