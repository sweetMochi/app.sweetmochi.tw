import { Component } from '@angular/core';
import { API_LIST } from '../../../../base/const/api-list.const';
import { NoteData } from '../../../../base/type/base.type';
import { NoteBaseComponent } from '../base/note-base.component';



/**
 * 新建筆記
 */
@Component({
	standalone: false,
	selector: 'app-note-new',
	templateUrl: './note-new.component.html',
	styleUrl: './note-new.component.less'
})
export class AppNoteNewComponent extends NoteBaseComponent {


	init(): void {
	}


	/**
	 * 新增筆記
	 * @param data 筆記資料
	 */
	userPost(data: NoteData): void {
		console.log(data);
		this.http.get(
			API_LIST.NOTE_POST,
			data,
			() => {
				// 顯示新增成功
				this.widget.snackBar('Create successful');
				this.backToList();
			},
			status => {
				this.widget.snackBar(status.desc || '');
			}
		);
	}

}
