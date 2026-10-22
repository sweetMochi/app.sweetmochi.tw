import { Component, ChangeDetectionStrategy } from '@angular/core'
import { LocalStorageKey, RootModule } from '../../../root'
import { FormComponent } from '../../base'

/**
 * 設定頁面
 */
@Component({
	selector: 'page-setting',
	imports: [RootModule],
	templateUrl: './setting.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrl: './setting.component.less',
})
export class AppSettingComponent extends FormComponent {
	/** 驗證表單 */
	formGroup = this.formBuilder.group({
		/** API 服務離線測試 */
		apiOffline: false,
		/** Youtube API 離線測試 */
		youTubeOffline: false,
	})

	init(): void {
		// 從本地資料取得設定
		this.formGroup.controls.apiOffline.setValue(super.local.get('apiOffline') || false)
		this.formGroup.controls.youTubeOffline.setValue(super.local.get('youTubeOffline') || false)
	}

	/**
	 * 使用者變更資料事件
	 * @param key 欄位值
	 */
	userChange(key: LocalStorageKey): void {
		// 修改本地儲存設定
		super.local.set<boolean>(
			key,
			this.formGroup.controls[key as 'youTubeOffline' | 'apiOffline'].value || false,
		)
	}
}
