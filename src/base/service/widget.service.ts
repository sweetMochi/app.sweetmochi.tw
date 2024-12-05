import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_FADEOUT_TIME } from '../const/base.const';
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmComponent } from '../../app/base/popup-confirm/popup-confirm.component';



/**
 * 通用元件
 */
@Injectable({
    providedIn: 'root'
})
export class WidgetService {

	readonly dialog = inject(MatDialog);


	constructor(
		private matSnackBar: MatSnackBar
	) {}


	/**
	 * 顯示確認跳窗
	 * @param content 內容
	 * @param action 確認回調
	 * @param cancel 取消回調
	 * @param title 標題
	 */
	popConfirm(content: string, action: () => void, cancel?: () => void, title?: string): void {
		let dialogRef = this.dialog.open(PopupConfirmComponent);

		// 修改元件標題與內容
		dialogRef.componentInstance.headline = title || '';
		dialogRef.componentInstance.content = content;

		// 關注關閉事件
		dialogRef.afterClosed().subscribe(
			(result:boolean) => {
				// 如果關閉有回傳值
				if (result === true) {
					// 確認回調
					action();
				} else {
					if (cancel) {
						// 取消回調
						cancel();
					}
				}
			}
		);

	}


    /**
     * 提醒
     * @param msg 訊息
     * @param btnName 按鈕名稱
     */
	snackBar(msg = '', btnName = 'OK'): void {

		if (msg === '') {
			return;
		}

		this.matSnackBar.open(
			msg,
			btnName,
			{
				horizontalPosition: 'center',
				duration: SNACK_BAR_FADEOUT_TIME
			}
		);
	}

}
