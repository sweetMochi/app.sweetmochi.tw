import { Directive, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './service/http.service';
import { LocalService } from './service/local.service';
import { WidgetService } from './service/widget.service';


/**
 * 底層功能
 *
 * 不使用 constructor injection 避免繼承時需使用到 super 初始化
 *
 */
@Directive()
export abstract class RootComponent implements OnInit {
	// https://angular.dev/guide/di/dependency-injection-context
	private injectorHttpService = inject(HttpService);
	private injectorWidgetService = inject(WidgetService);
	private injectorLocalService = inject(LocalService);
	private injectorRouter = inject(Router);
	private injectorRoute = inject(ActivatedRoute);
	private injectorFormBuilder = inject(FormBuilder);



	ngOnInit(): void {
		this.init();
	}


	/**
	 * 繼承的子類別都必須使用 init()
	 */
	abstract init(): void;

	get router() { return this.injectorRouter }
	get route() { return this.injectorRoute }
	get formBuilder() { return this.injectorFormBuilder }


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
	get localService() {
		return this.injectorLocalService;
	}


}
