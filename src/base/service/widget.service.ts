import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';



/**
 * 通用元件
 */
@Injectable({
    providedIn: 'root'
})
export class WidgetService {


	constructor(
		private matSnackBar: MatSnackBar
	) {}


    /**
     * 提醒
     * @param msg 訊息
     * @param btnName 按鈕名稱
     */
	snackBar(msg: string, btnName = 'OK'): void {
		this.matSnackBar.open(
			msg,
			btnName,
			{
				horizontalPosition: 'center',
				duration: 3000
			}
		);
	}

}
