import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../type/base.type';



/**
 * 本地服務
 */
@Injectable({
    providedIn: 'root'
})
export class LocalService {



	constructor(
	) {}


	/**
	 * 取得本地儲存資料
	 * @param key 欄位
	 */
	get<T = string>(key: LocalStorageKey): T {
		let item = key as unknown as string;
		return JSON.parse(localStorage.getItem(item) || '') as T;
	}

	/**
	 * 儲存本地儲存資料
	 * @param key 欄位
	 * @param val 數值
	 */
	set<T = string>(key: LocalStorageKey, val: T) {
		let item = key as unknown as string;
		localStorage.setItem(item, JSON.stringify(val));
	}


}
