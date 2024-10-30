


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
 * 本地儲存
 */
export interface LocalStorage {
    /** API 服務離線測試 */
    apiOffline: boolean;
    /** Youtube API 離線測試 */
    youTubeOffline: boolean;
}


/**
 * 本地儲存欄位
 */
export type LocalStorageKey = keyof LocalStorage;
