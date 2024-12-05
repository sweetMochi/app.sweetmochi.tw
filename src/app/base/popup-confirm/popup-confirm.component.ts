import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';



/**
 * 確認跳窗
 */
@Component({
	selector: 'app-popup-confirm',
	standalone: false,
	templateUrl: './popup-confirm.component.html',
	styleUrl: './popup-confirm.component.less'
})
export class PopupConfirmComponent {
	readonly dialogRef = inject(MatDialogRef<PopupConfirmComponent>);

	/** 標題 */
	headline = '';

	/** 內文 */
	content = '';


	/**
	 * 關閉跳窗
	 */
	userClose(): void {
		this.dialogRef.close();
	}


}
