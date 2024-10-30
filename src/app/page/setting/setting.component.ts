import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../base/service/http.service';
import { LocalService } from '../../../base/service/local.service';
import { LocalStorageKey } from '../../../base/type/base.type';



/**
 * 設定頁面
 */
@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrl: './setting.component.less'
})
export class PageSettingComponent implements OnInit {


	/** 驗證表單 */
	formGroup = this.formBuilder.group(
		{
			/** API 服務離線測試 */
			apiOffline: false,
			/** Youtube API 離線測試 */
			youTubeOffline: false
		}
	);


	constructor(
		private http: HttpService,
		private local: LocalService,
		private formBuilder: FormBuilder
	) { }


	ngOnInit(): void {
		// 從本地資料取得設定
		this.formGroup.controls.apiOffline.setValue(this.local.get('apiOffline'));
	}


	/**
	 * 使用者變更資料事件
	 * @param key 欄位值
	 */
	userChange(key: LocalStorageKey): void {
		if (key === 'apiOffline') {
			this.local.set<boolean>('apiOffline', this.formGroup.controls.apiOffline.value || false);
			if (this.formGroup.controls.apiOffline) {
				this.http.editApiKey('');
			}
		}
	}


}
