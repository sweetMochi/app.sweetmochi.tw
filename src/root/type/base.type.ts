import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpRq } from './http.type';


/**
 * API 型別
 */
export interface ApiKey {
    /** API Key */
    apiKey: string;
}


/**
 * 選單列
 */
export interface NavList {
    /** 路徑 */
    path: string;
    /** 圖示 */
    icon: string;
    /** 名稱 */
    name: string;
}


/**
 * 後端 API 格式
 */
export interface DataApi {
    /** 錯誤代碼 */
    code: string;
    /** 錯誤說明 */
    desc?: string;
    /** 回傳資料 */
    data?: any;
}


/**
 * 筆記本 - 回傳資料
 */
export interface NoteData {
    /** 編號 */
    id?: string;
    /** 標題 */
    title: string;
    /** 內文 */
    content: string;
    /** 圖片 */
    image?: string;
    /** 日期 */
    date: string;
    /** 標籤 */
    tag?: string[];
}


/**
 * 筆記本 - 欄位名稱
 */
export type NoteKey = keyof NoteData;


/**
 * 本地儲存
 */
export interface LocalStorage {
    /** API 服務離線測試 */
    apiOffline: boolean;
    /** Youtube API 離線測試 */
    youTubeOffline: boolean;
    /** 記事本 */
    noteData: NoteData[];
}


/**
 * 本地儲存欄位
 */
export type LocalStorageKey = keyof LocalStorage;


/**
 * API 狀態
 */
export class ApiStatus implements DataApi {

    /** 錯誤代碼 */
    code = '';

    /** 錯誤說明 */
    desc = '';

    /** 回傳資料 */
    data: any = null;

    constructor(
        code: string,
        desc?: string,
        data?: any
    ) {
        this.code = code || '';
        this.desc = desc || '';
        this.data = data || null;
    }

    /**
     * 取得 HTTP 狀態
     */
    get http() {

        // 網路請求回覆格式
        let httpRq: HttpRq = {
            status: 200,
            body: {
                code: this.code
            }
        };

        // 如果有錯誤說明
        if (this.desc) {
            httpRq.body.desc = this.desc;
        }

        // 如果有回傳資料
        if (this.data) {
            httpRq.body.data = this.data;
        }

        return of(new HttpResponse(httpRq));
    }

}
