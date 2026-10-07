import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, retry, RetryConfig, throwError, timer } from 'rxjs';
import { apiStatus, apiUrl, httpRetryTimes, httpRetryStatus, httpRetryMethods, httpRetryDelay } from '../const';
import { ApiKey, DataApi, HttpMothod } from '../type';
import { WidgetService } from './widget.service';



/**
 * 連線服務
 */
@Injectable({ providedIn: 'root' })
export class HttpService {
	private widgetService = inject(WidgetService);
	private http = inject(HttpClient);

	/** 儲存 API Key */
	private apiKeySave = '';


	/**
	 * 重試設定
	 * @param method HTTP 方法
	 */
	private retryConfig(method: HttpMothod): RetryConfig {
		return {
			// 不可重試的方法次數為 0，不會重試
			count: httpRetryMethods.includes(method) ? httpRetryTimes : 0,
			delay: (error, retryCount) => {
				// 不是 HTTP 錯誤，或不是暫時性錯誤，直接拋出
				if (!(error instanceof HttpErrorResponse) || !httpRetryStatus.includes(error.status)) {
					return throwError(() => error);
				}
				// 重試等待的時間加倍（500ms → 1s → 2s）
				return timer(httpRetryDelay * 2 ** (retryCount - 1));
			}
		};
	}


	/**
	 * 修改 API 欄位
	 */
	editApiKey(api: string): void {
		this.apiKeySave = api;
	}


	/**
	 * 取得 API KEY
	 * @param url 網址
	 */
	apiKey() {
		return new Promise<string>((resolve, reject) => {

			// 如果已經有 API Key
			if (this.apiKeySave) {
				resolve(this.apiKeySave);
				return;
			}

			// 沒有的話則嘗試取得 API Key
			this.getJson<ApiKey>(`${apiUrl}/`).pipe(
				// 例外處理
				catchError(
					(error: HttpErrorResponse) => {
						reject(error);
						return EMPTY;
					}
				)
			).subscribe(data => {
				this.apiKeySave = data.apiKey;
				resolve(data.apiKey);
			});

		});

	}


	/**
	 * 取得 JSON 方法
	 * @param url 網址
	 */
	getJson<T>(url: string) {
		return this.http.get<T>(
			url,
			{
				responseType: 'json'
			}
		).pipe(
			retry(this.retryConfig('get')),
			catchError(this.handleError)
		);
	}


	/**
	 * 接口方法
	 * @param url 網址
	 * @param rq 請求資料
	 * @param action 回傳資料
	 * @param cancel 回傳錯誤
	 */
	request<T, U = {} | null>(
		method: HttpMothod,
		url: string,
		rq: U,
		action: (data: T) => void,
		cancel?: (data: DataApi) => void
	): void {

		this.http.request<DataApi>(
			method,
			url,
			{
				// 固定回傳 json 格式
				responseType: 'json',
				// 如果有請求參數則傳入請求參數
				body: rq ?? undefined
			}
		).pipe(
			retry(this.retryConfig(method)),
			// 可能是 HttpErrorResponse 或是 TypeError
			catchError((data: unknown) => {
				// 保留原始錯誤供除錯
				console.error(`Request failed: ${method.toUpperCase()} ${url}`, data);
				// 提醒回調方法
				this.cancelAction(apiStatus.connectFailure, cancel);
				// 錯誤已處理，結束串流
				return EMPTY;
			})
		).subscribe(res => {

			// 如果沒有錯誤代碼
			if (res.code === '') {
				// 返回請求資料
				action(res.data);
				return;
			}

			// 提醒回調方法
			this.cancelAction(res, cancel);
		});
	}


	/**
	 * 提醒回調方法
	 * @param data 後端資料
	 * @param cancel 錯誤回調
	 */
	cancelAction(data: DataApi, cancel?: (data: DataApi) => void) {
		// 如果有設置錯誤回調
		if (cancel) {
			// 錯誤回調
			cancel(data);
		} else if (cancel === undefined) {
			// 預設使用 snack bar 提醒
			this.widgetService.snackBar(data.desc);
		}
	}


	/**
	 * 錯誤處理
	 * @param error HTTP 錯誤回應
	 */
	private handleError(error: HttpErrorResponse) {
		if (error.status === 0) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong.
			console.error(`Backend returned code ${error.status}, body was: `, error.error);
		}
		// Return an observable with a user-facing error message.
		return throwError(() => new Error('Something bad happened; please try again later.'));
	}


}
