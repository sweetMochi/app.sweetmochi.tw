import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

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
 * 日期正則表達式
 */
export const DATE_REGEX = /[1-9][0-9]{3}-(1[0-2]|0[1-9])-(3[0-1]|[1-2][0-9]|0[1-9])/;

/**
 * 日期格式化
 */
export const DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    },
    display: {
        dateInput: 'YYYY/MM/DD',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};

/**
 * HTTP 請求重試次數
 */
export const HTTP_RETRY_TIMES = 3;

/**
 * 小提醒自動淡出時間
 */
export const SNACK_BAR_FADEOUT_TIME = 3000;

MAT_DATE_FORMATS
