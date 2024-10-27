import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, retry, throwError } from 'rxjs';
import { API_URL } from '../const';
import { ApiKey } from '../type/base.type';



/**
 * 連線服務
 */
@Injectable({
    providedIn: 'root'
})
export class httpService {

    /** 儲存 API Key */
    private apiKeySave = '';

    /**
     * http 正則表達，開頭為 http 或 https
     */
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
            this.get<ApiKey>(API_URL).pipe(
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
    get<T>(url: string) {
        return this.http.get<T>(
            url,
            {
                responseType: 'json'
            }
        ).pipe(
            retry(3),
            catchError(this.handleError)
        );
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
