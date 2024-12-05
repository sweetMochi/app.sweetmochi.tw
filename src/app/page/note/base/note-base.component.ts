import { Directive, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../base/service/http.service';
import { WidgetService } from '../../../../base/service/widget.service';



/**
 * 記事本通用功能
 */
@Directive()
export abstract class NoteBaseComponent implements OnInit {


	constructor(
		public http: HttpService,
		public router: Router,
		public route: ActivatedRoute,
		public widget: WidgetService,
		public formBuilder: FormBuilder,
	) { }


	ngOnInit(): void {
		this.init();
	}


	/**
	 * 初始化
	 */
	abstract init(): void;


	/**
	 * 前往編輯頁
	 * @param id 序號
	 */
	toEditPage(id: string): void {
		this.router.navigate([`/note/${id}`]);
	}


	/**
	 * 前往新增頁
	 */
	toNewPage(): void {
		this.router.navigate([`/note/new`]);
	}


	/**
	 * 返回記事本列表
	 */
	backToList(): void {
		this.router.navigate(['/note']);
	}


}
