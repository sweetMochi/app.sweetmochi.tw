
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
    desc: string;
    /** 回傳資料 */
    data?: any;
}


/**
 * 筆記本
 */
export interface AppNote {
    /** 編號 */
    id: string;
    /** 標題 */
    title: string;
    /** 內文 */
    content: string;
    /** 圖片 */
    image: string;
    /** 日期 */
    date: string;
    /** 標籤 */
    tag: string[];
}


/**
 * 本地儲存
 */
export interface LocalStorage {
    /** API 服務離線測試 */
    apiOffline: boolean;
    /** Youtube API 離線測試 */
    youTubeOffline: boolean;
    /** 記事本 */
    appNote: AppNote[];
}


/**
 * 本地儲存欄位
 */
export type LocalStorageKey = keyof LocalStorage;
