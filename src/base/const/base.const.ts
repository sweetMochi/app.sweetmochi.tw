
/** API 主機 */
export const API_URL = 'https://app.sweetmochi.tw/api';

/** 資料網址 */
export const DATA_URL = '/data';

/**
 * 網址正則表達式
 *
 *      http 或 s -> 選填
 *      英數字與「-」構成
 *      頂級網域只允許英文
 */
export const URL_REGEX = /(https?:\/\/)?[\da-z]+\.[a-z]+/;

/**
 * HTTP 請求重試次數
 */
export const HTTP_RETRY_TIMES = 3;

/**
 * 小提醒自動淡出時間
 */
export const SNACK_BAR_FADEOUT_TIME = 3000;
