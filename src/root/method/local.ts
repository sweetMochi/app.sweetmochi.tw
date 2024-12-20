import { LocalStorageKey } from '..';



/**
 * 本地方法
 *
 * 與本地儲存相關的方法都放在這裡
 *
 */
export class AppLocal {


	/**
	 * 取得本地儲存資料
	 * @param key 欄位
	 */
	static get<T = string>(key: LocalStorageKey): T {
		let item = key as unknown as string;
		return JSON.parse(localStorage.getItem(item) || 'null') as T;
	}


	/**
	 * 儲存本地儲存資料
	 * @param key 欄位
	 * @param val 數值
	 */
	static set<T = string>(key: LocalStorageKey, val: T) {
		let item = key as unknown as string;
		localStorage.setItem(item, JSON.stringify(val));
	}


	/**
	 * 產生 ID 編號
	 * @param prefix 前綴
	 */
	static id(prefix = ''): string {
		return`${prefix}${new Date().getTime()}`;
	}


}
