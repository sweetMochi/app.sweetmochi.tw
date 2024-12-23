import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, retry, throwError } from 'rxjs';
import { apiStatus, apiUrl, httpRetryTimes } from '../const';
import { ApiKey, DataApi } from '../type';
import { WidgetService } from './widget.service';



/**
 * 連線服務
 */
@Injectable()
export class HttpService {
    private widgetService = inject(WidgetService);
    private http = inject(HttpClient);

    /** 儲存 API Key */
    private apiKeySave = '';


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
            ).subscribe( data => {
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
            retry(httpRetryTimes),
            catchError(this.handleError)
        );
    }


    /**
     * 接口 get 方法
     * @param url 網址
     * @param rq 請求資料
     * @param resolve 回傳資料
     * @param reject 回傳錯誤
     */
    get<T, U = {} | null>(url: string, rq: U, resolve: (data: T) => void, reject?: (data: DataApi) => void): void {
        this.http.get<DataApi>(
            url,
            {
                // 固定回傳 json 格式
                responseType: 'json',
                // 如果有請求參數則傳入請求參數
                params: rq ? rq : {}
            }
        ).pipe(
            retry(httpRetryTimes),
            catchError(data => {
                // 提醒回調方法
                this.rejectAction(apiStatus.connectFailure, reject);
                // 詳細錯誤
                return throwError(() => new Error(data));
            })
        ).subscribe(res => {

            // 如果沒有錯誤代碼
            if (res.code === '') {
                // 返回請求資料
                resolve(res.data);
                return;
            }

            // 提醒回調方法
            this.rejectAction(res, reject);
        });
    }


    /**
     * 提醒回調方法
     * @param data 後端資料
     * @param reject 錯誤回調
     */
    rejectAction(data: DataApi, reject?: (data: DataApi) => void) {
        // 如果有設置錯誤回調
        if (reject) {
            // 錯誤回調
            reject(data);
        } else if (reject === undefined) {
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
