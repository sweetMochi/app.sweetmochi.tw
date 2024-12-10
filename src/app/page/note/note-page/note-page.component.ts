import { Component } from '@angular/core';
import { API_LIST } from '../../../../root/const/api-list.const';
import { NoteData } from '../../../../root/type/base.type';
import { HttpMothod } from '../../../../root/type/http.type';
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

	/** 卡牌方法 */
	cardType: HttpMothod = 'post';

	/** 序號 */
	id = '';

	/** 資料 */
	data: NoteData = {
		title: '',
		content: '',
		date: ''
	};


	init(): void {
		this.id = this.route.snapshot.paramMap.get('id') || '';

		// 如果從網址有取得 ID
		if (this.id) {
			// 設定卡牌為修改類型
			this.cardType = 'patch';
			// 依照 ID 取得卡牌資料
			this.getNote(this.id);
		}
	}


	/**
	 * 取得筆記資料
	 * @param id 序號
	 */
	getNote(id: string): void {
		super.httpService.get<NoteData>(
			`${API_LIST.NOTE_GET}/${id}`,
			null,
			data => this.data = data,
			status => {
				// 未取得資料，顯示提醒
				super.widgetService.snackBar(status.desc);
				// 返回列表頁
				super.backToList();
			}
		);
	}


	/**
	 * 使用者觸發回調
	 * @param data
	 */
	userAction(data: NoteData): void {
		// 如果類型為卡牌修改
		if (this.cardType === 'patch') {
			this.cardPatch(data);
		} else {
			this.cardPost(data);
		}
	}


	/**
	 * 卡牌新增
	 * @param data 筆記資料
	 */
	cardPost(data: NoteData): void {
		this.httpService.get(
			API_LIST.NOTE_POST,
			data,
			() => {
				// 顯示新增成功
				super.widgetService.snackBar('Create successful');
				// 返回列表頁
				super.backToList();
			}
		);
	}


	/**
	 * 卡牌修改
	 * @param data 筆記資料
	 */
	cardPatch(data: NoteData): void {
		this.httpService.get(
			`${API_LIST.NOTE_PATCH}/${this.id}`,
			data,
			() => {
				// 顯示新增成功
				super.widgetService.snackBar('Edit successful');
				// 返回列表頁
				super.backToList();
			}
		);
	}


}
