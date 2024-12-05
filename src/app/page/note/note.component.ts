import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { API_LIST } from '../../../base/const/api-list.const';
import { NoteData } from '../../../base/type/base.type';
import { NoteBaseComponent } from './base/note-base.component';



/**
 * 記事本功能
 */
@Component({
	standalone: false,
	selector: 'page-note',
	templateUrl: './note.component.html',
	styleUrl: './note.component.less'
})
export class AppNoteComponent extends NoteBaseComponent {


	/** 筆記列表 */
	list: NoteData[] = [];


	init(): void {
		this.updateList();
	}


	/**
	 * 取得筆記列表
	 */
	updateList(): void {
		this.http.get<NoteData[]>(
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

		let api = `${API_LIST.NOTE_DELETE}/${id}`;

		// 後端請求
		this.http.get(
			api,
			null,
			() => {
				// 顯示刪除成功
				this.widget.snackBar('Delete successful');
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
