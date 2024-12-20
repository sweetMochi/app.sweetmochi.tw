


/**
 * API 型別
 */
export interface ApiKey {
    /** API Key */
    apiKey: string;
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
export interface HttpRs {
    /** 狀態 */
    status: number;
    /** 內容 */
    body: DataApi;
}
