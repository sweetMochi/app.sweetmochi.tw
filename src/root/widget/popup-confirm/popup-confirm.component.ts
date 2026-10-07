import { Component, inject, ChangeDetectionStrategy } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'

/**
 * 確認跳窗
 */
@Component({
	selector: 'app-popup-confirm',
	imports: [MatButton, MatDialogModule],
	templateUrl: './popup-confirm.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrl: './popup-confirm.component.less',
})
export class PopupConfirmComponent {
	readonly dialogRef = inject(MatDialogRef<PopupConfirmComponent>)

	/** 標題 */
	headline = ''

	/** 內文 */
	content = ''

	/**
	 * 關閉跳窗
	 */
	userClose(): void {
		this.dialogRef.close()
	}
}
