import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, filter, map, retry, tap, throwError } from 'rxjs';
import { API_URL, HTTP_RETRY_TIMES } from '../const/base.const';
import { ApiKey, DataApi } from '../type/base.type';



/**
 * 連線服務
 */
@Injectable({
    providedIn: 'root'
})
export class HttpService {


    /** 儲存 API Key */
    private apiKeySave = '';

    /** http 正則表達，開頭為 http 或 https */
    readonly httpRegex = '^https?://';


	constructor(
		private http: HttpClient
	) {}


    /**
     * 重建 URL 物件
     * @param url 網址
     */
    url(url: string): URL {

        // 網址正則表達
        let httpRegex = new RegExp(this.httpRegex);
        // 如果沒有 http 或 https 則加入 https
        let urlRaw = httpRegex.test(url) ? url : `https://${url}`;

        return new URL(urlRaw);

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
            this.getRoot<ApiKey>(`${API_URL}/`).pipe(
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
     * 接口 get 方法
     * @param url 網址
     */
    getRoot<T>(url: string) {
        return this.http.get<T>(
            url,
            {
                responseType: 'json'
            }
        ).pipe(
            retry(HTTP_RETRY_TIMES),
            catchError(this.handleError)
        );
    }


    /**
     * 接口 get 方法
     * @param url 網址
     * @param resolve 回傳資料
     * @param reject 回傳錯誤
     * @param rq 請求資料
     */
    get<T, U = {} | null>(url: string, resolve: (data: T) => void, reject?: (data: DataApi) => void, rq?: U): void {
        this.http.get<DataApi>(
            url,
            {
                responseType: 'json',
                // 如果有請求參數則傳入請求參數
                params: rq ? rq : {}
            }
        ).pipe(
            retry(HTTP_RETRY_TIMES),
            // TODO：路徑錯誤回調
            catchError(this.handleError)
        ).subscribe(res => {
            // 如果沒有錯誤代碼
            if (res.code === '') {
                // 返回請求資料
                resolve(res.data);
            } else {
                // 如果有設置錯誤回調
                if (reject) {
                    // 錯誤回調
                    reject(res);
                }
            }
        });
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
