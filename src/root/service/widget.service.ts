import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupConfirmComponent } from '../widget/popup-confirm/popup-confirm.component';
import { SNACK_BAR_FADEOUT_TIME } from '../const/base.const';



/**
 * 通用元件
 */
@Injectable()
export class WidgetService {
	dialog = inject(MatDialog);
	matSnackBar = inject(MatSnackBar);



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
