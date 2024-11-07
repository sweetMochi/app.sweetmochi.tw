import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../base/service/http.service';
import { LocalService } from '../../../base/service/local.service';
import { LocalStorageKey } from '../../../base/type/base.type';



/**
 * 設定頁面
 */
@Component({
	selector: 'page-setting',
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
		this.formGroup.controls.apiOffline.setValue(this.local.get('apiOffline') || false);
		this.formGroup.controls.youTubeOffline.setValue(this.local.get('youTubeOffline') || false);
	}


	/**
	 * 使用者變更資料事件
	 * @param key 欄位值
	 */
	userChange(key: LocalStorageKey): void {

		// 修改本地儲存設定
		this.local.set<boolean>(key, this.formGroup.controls[key as 'youTubeOffline' | 'apiOffline'].value || false);

		// 如果為設定 API 離線模式
		// 並且離線模式設定為 true
		if (key === 'apiOffline' && this.formGroup.controls.apiOffline) {
			// 清空 API 設定
			this.http.editApiKey('');
		}
	}


}
