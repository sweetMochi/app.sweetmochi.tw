import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { RootComponent } from '../root';
import { appSetImport, appSetProvider } from './app.const';
import { NavList } from './app.type';



@Component({
	selector: 'app-root',
	providers: appSetProvider,
	imports: appSetImport,
	templateUrl: './app.component.html',
	styleUrl: './app.component.less'
})
export class AppComponent extends RootComponent {

	/** 側欄元件 */
	@ViewChild(MatSidenav) sidenav!: MatSidenav;

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


	init(): void {

		// 取得 API Key 並進行例外處理
		this.httpService.apiKey().catch(() => {
			this.widgetService.snackBar('Init error');
		});

		// 關注路由事件
		this.router.events.pipe(
			filter(e => e instanceof NavigationEnd)
		).subscribe(e => {
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
