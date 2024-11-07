import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { HttpService } from '../base/service/http.service';
import { WidgetService } from '../base/service/widget.service';
import { NavList } from '../base/type/base.type';



@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {


	/** 側欄元件 */
	@ViewChild(MatSidenav)
	sidenav!: MatSidenav;

	/** 當前路徑 */
	path = '';

	/** 導覽列 */
	nav: NavList[] = [
		{
			path: '/youtube-thumbnail',
			icon: 'image',
			name: 'YouTube Thumbnail'
		},
		{
			path: '/note',
			icon: 'description',
			name: 'Note'
		}
	];


	constructor(
		private router: Router,
		private http: HttpService,
		private widget: WidgetService
	) { }


	ngOnInit(): void {

		// 取得 API Key 並進行例外處理
		this.http.apiKey().catch(() => {
			this.widget.snackBar('Init error');
		});

		// 關注路由事件
		this.router.events.pipe(
			filter((e): e is NavigationEnd => e instanceof NavigationEnd)
		).subscribe(() => {
			// 關閉導覽列
			this.sidenav.close();
			// 取得當前網址
			this.path = this.router.url;
		});

	}


	/**
	 * 開關側欄
	 */
	toggleAside(): void {
		this.sidenav.toggle();
	}


}
