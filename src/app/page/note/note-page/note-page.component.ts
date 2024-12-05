import { Component } from '@angular/core';
import { API_LIST } from '../../../../base/const/api-list.const';
import { NoteData } from '../../../../base/type/base.type';
import { NoteBaseComponent } from '../base/note-base.component';



/**
 * 筆記內頁
 */
@Component({
	standalone: false,
	selector: 'app-note-page',
	templateUrl: './note-page.component.html',
	styleUrl: './note-page.component.less'
})
export class AppNotePageComponent extends NoteBaseComponent {


	/** 序號 */
	id = '';

	/** 資料 */
	data: NoteData = {
		id: '',
		title: '',
		content: '',
		date: ''
	}


	init(): void {
		this.id = this.route.snapshot.paramMap.get('id') || '';
		this.getNote(this.id);
	}


	/**
	 * 取得筆記資料
	 * @param id 序號
	 */
	getNote(id: string): void {
		this.http.get<NoteData>(
			`${API_LIST.NOTE_GET}/${id}`,
			null,
			data => this.data = data,
			status => {
				// 未取得資料，顯示提醒
				super.widget.snackBar(status.desc);
				// 返回列表頁
				super.backToList();
			}
		);
	}


	/**
	 * 修改筆記
	 * @param data 筆記資料
	 */
	userPatch(data: NoteData): void {
		this.http.get(
			`${API_LIST.NOTE_PATCH}/${this.id}`,
			data,
			() => {
				// 顯示新增成功
				this.widget.snackBar('Edit successful');
				// 返回列表頁
				this.backToList();
			}
		);
	}


}
