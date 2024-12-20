import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RootModule } from '../../../../../root';
import { NoteBaseComponent } from '../note-base.component';
import { NoteData } from '../note-base.type';



/**
 * 筆記卡牌
 */
@Component({
	selector: 'note-base-card',
	imports: [
		RootModule
	],
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

		// 如果有序號
		if (this.item.id) {
			this.toEditPage(this.item.id);
			return;
		}
	}


	/**
	 * 刪除筆記
	 */
	userDelete(): void {

		// 顯示確認視窗
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
