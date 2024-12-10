import { Directive } from '@angular/core';
import { RootComponent } from '../../../../root/root.component';



/**
 * 記事本通用功能
 */
@Directive()
export abstract class NoteBaseComponent extends RootComponent {



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
