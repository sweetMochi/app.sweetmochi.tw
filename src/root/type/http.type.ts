import { DataApi } from './base.type';


/**
 * HTTP 狀態
 *
 *      get: 查詢，若沒有傳入 ID 則視為取得全部列表
 *      post: 新增，創建 ID 並新增記錄
 *      patch: 修改，根據現有 ID 資料進行編輯
 *      delete: 刪除，刪除該筆 ID 資料
 */
export type HttpMothod = 'get' | 'post' | 'patch' | 'delete';


/**
 * HTTP 請求
 */
export interface HttpRq {
    /** 狀態 */
    status: number;
    /** 內容 */
    body: DataApi;
}
