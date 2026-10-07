import { HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoteData, NoteKey } from '../../app/page/note/_base/note-base.type';
import { apiStatus } from '../const';
import { ApiStatus, AppLocal } from '../method';
import { HttpMothod } from '../type';




/**
 * 筆記本模擬資料庫攔截器
 */
export const noteInterceptor: HttpInterceptorFn = (req, next) => {

	/** POST 請求基本欄位 */
	let rqBaseKey: NoteKey[] = ['title', 'content', 'date'];

	/** 本地 */
	let local = AppLocal;

	// 預設返回正常 http 請求
	let rq = next(req);


	/**
	 * 取得方法
	 * @param id 編號
	 */
	function getRq(id?: string): Observable<HttpEvent<any>> {

		// 如果有 ID
		if (id) {
			// 從本地取得資料
			let data: NoteData[] = local.get('noteData') || [];
			// 比對 ID 取得筆記
			let target = data.find(item => item.id === id);
			// 如果有取得對應筆記，則返回筆記資料
			// 沒有資料則返回預設錯誤訊息
			return target ? ok(target) : apiStatus.noData.http;
		}

		// 從本地取得資料
		let data: NoteData[] = local.get('noteData') || [];
		// 如果有取得筆記列表，則返回筆記列表
		// 沒有資料則返回正常
		return ok(data);
	}


	/**
	 * 新增方法
	 * @param req HTTP 請求
	 */
	function postRq(req: HttpRequest<any>) {

		// 檢查是否滿足基本欄位
		const valid = rqBaseKey.every(data => req.body?.[data]);

		if (!valid) {
			// 資料格式錯誤
			return apiStatus.dataInvalid.http;
		}

		// 取得筆記本列表
		const noteList = local.get<NoteData[]>('noteData') || [];

		// 創建筆記物件
		const add = noteDataRq(req.body);
		console.log(`Request post data: `, add);

		// 如果筆記列表已存在且已經有資料
		if (noteList && noteList.length > 0) {
			// 新增當前資料
			noteList.push(add);
			// 更新本地資料
			local.set<NoteData[]>('noteData', noteList);
		} else {
			// 將新增資料當作是第一筆紀錄
			local.set<NoteData[]>('noteData', [add]);
		}

		// 回覆 OK
		return ok(add);

	}


	/**
	 * 整份更新方法
	 * @param id 編號
	 * @param req HTTP 請求
	 */
	function putRq(id: string, req: HttpRequest<any>) {

		if (!id) {
			// 需填寫 ID
			return apiStatus.idRequired.http;
		}

		// 檢查是否滿足基本欄位
		let valid = rqBaseKey.every(data => req.body?.[data]);

		if (!valid) {
			// 資料格式錯誤
			return apiStatus.dataInvalid.http;
		}

		// 從本地取得資料
		let data: NoteData[] = local.get('noteData') || [];

		// 比對 ID 序號取得筆記
		let index = data.findIndex(item => item.id === id);

		// 如果沒有取得序號
		if (index < 0) {
			// 找不到資料
			return apiStatus.noData.http;
		}

		// 修改筆記物件
		let edit = noteDataRq(req.body, id);
		console.log(`Request put data: `, edit);

		// 更新對應資料
		data[index] = edit;

		// 更新本地資料
		local.set<NoteData[]>('noteData', data);

		// 回覆 OK
		return ok(edit);

	}


	/**
	 * 刪除方法
	 * @param id 編號
	 */
	function deleteRq(id: string) {

		if (!id) {
			// 資料格式錯誤
			return apiStatus.idRequired.http;
		}

		console.log(`Del data: ${id}`);

		// 從本地取得資料
		let data: NoteData[] = local.get('noteData') || [];

		// 比對 ID 序號取得筆記
		let index = data.findIndex(item => item.id === id);

		// 如果沒有取得序號
		if (index < 0) {
			// 找不到資料
			return apiStatus.noData.http;
		}

		// 移除指定序號的資料
		data.splice(index, 1);

		// 更新本地資料
		local.set<NoteData[]>('noteData', data);

		// 回覆 OK
		return apiStatus.ok.http;

	}


	/**
	 * 筆記本請求資料
	 * @param body 參數
	 * @param id 序號
	 */
	function noteDataRq(body: any, id?: string): NoteData {
		return {
			id: id ? id : local.id(),
			title: body.title || '',
			content: body.content || '',
			date: body.date || '',
			image: body.image || '',
			tag: body.tag || []
		};
	}


	/**
	 * 回覆正常
	 * @param data 回覆資料
	 */
	function ok(data = {}) {
		return new ApiStatus('', '', data).http;
	}


	/**
	 * 除錯記錄
	 * @param page 功能
	 * @param mothod 方法
	 * @param id 編號
	 */
	function debug(page: string, mothod: string, id?: string): void {
		console.log(`Request page: ${page} and use mothod: ${mothod}`);

		if (id) {
			console.log(`Request id: ${id}`);
		}
	}

	// 資料網址，方法由 HTTP method 決定
	// 範例：
	// GET    /data/note
	// GET    /data/note/1
	// POST   /data/note
	// PUT   /data/note/1
	// DELETE /data/note/1
	let url = req.url.split('/');

	let [_empty, rootData, page, id] = url;

	// 符合 '/data/note' 網址格式
	if (rootData === 'data' && page === 'note') {

		// 取得方法，Angular 會將 method 轉為大寫
		let httpMethod = req.method.toLowerCase() as HttpMothod;

		// 顯示除錯訊息
		debug(page, httpMethod, id);

		// 判斷方法回傳資料
		switch (httpMethod) {

			case 'get':
				rq = getRq(id);
				break;

			case 'post':
				rq = postRq(req);
				break;

			case 'put':
				rq = putRq(id, req);
				break;

			case 'delete':
				rq = deleteRq(id);
				break;

		}

	}


	return rq;
};
