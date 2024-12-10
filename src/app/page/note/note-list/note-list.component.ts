import { Component } from '@angular/core';
import { API_LIST } from '../../../../root/const/api-list.const';
import { NoteData } from '../../../../root/type/base.type';
import { NoteBaseComponent } from '../base/note-base.component';



/**
 * 記事本功能
 */
@Component({
	standalone: false,
	selector: 'app-note-list',
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
			API_LIST.NOTE_GET,
			null,
			data => this.list = data
		);
	}


	/**
	 * 刪除筆記
	 * @param id 序號
	 */
	userDelete(id: string): void {
		this.httpService.get(
			`${API_LIST.NOTE_DELETE}/${id}`,
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
		this.toNewPage();
	}

}
