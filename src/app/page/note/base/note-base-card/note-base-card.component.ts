import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteData } from '../../../../../root/type/base.type';
import { NoteBaseComponent } from '../note-base.component';



/**
 * 筆記卡牌
 */
@Component({
	standalone: false,
	selector: 'note-base-card',
	templateUrl: './note-base-card.component.html',
	styleUrl: './note-base-card.component.less'
})
export class NoteBaseCardComponent extends NoteBaseComponent {

	/** 刪除事件 */
	@Output() delete = new EventEmitter<string>();

	/** 傳入資料 */
	@Input() item: NoteData = {
		title: '',
		content: '',
		date: ''
	};

	/** 錯誤回調 */
	@Output() error = new EventEmitter();



	init(): void {

	}


	/**
	 * 編輯頁面
	 */
	userEdit(): void {

		console.log('Edit Data:', this.item);

		if (this.item.id) {
			this.toEditPage(this.item.id);
			return;
		}
	}


	/**
	 * 刪除筆記
	 */
	userDelete(): void {

		super.widgetService.popConfirm(
			'Are you sure to delete this note?',
			() => {
				let id = this.item.id;

				// 如果沒有傳入序號
				if (!id) {
					super.widgetService.snackBar('Data invalid');
					this.error.emit();
					return;
				}

				this.delete.emit(id);
			}
		);

	}


}
