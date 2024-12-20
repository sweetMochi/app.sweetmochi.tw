import { Component } from '@angular/core';
import { NoteBaseCardComponent, NoteBaseComponent, NoteData } from '../_base';
import { appList, RootModule } from '../../../../root';



/**
 * 筆記本功能
 */
@Component({
	selector: 'app-note-list',
	imports: [
		RootModule,
		NoteBaseCardComponent
	],
	templateUrl: './note-list.component.html',
	styleUrl: './note-list.component.less'
})
export class AppNoteListComponent extends NoteBaseComponent {


	/** 筆記列表 */
	list: NoteData[] = [];


	init(): void {
		this.updateList();
	}


	/**
	 * 取得筆記列表
	 */
	updateList(): void {
		super.httpService.get<NoteData[]>(
			appList.noteGet,
			null,
			data => this.list = data
		);
	}


	/**
	 * 刪除筆記
	 * @param id 序號
	 */
	userDelete(id: string): void {
		super.httpService.get(
			`${appList.noteDelete}/${id}`,
			null,
			() => {
				// 顯示刪除成功
				super.widgetService.snackBar('Delete successful');
				// 更新列表
				this.updateList();
			}
		);
	}


	/**
	 * 新增筆記
	 */
	userNew(): void {
		super.toNewPage();
	}

}
