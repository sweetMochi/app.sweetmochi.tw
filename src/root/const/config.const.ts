import { MatDateFormats } from '@angular/material/core';


/** 主機 API */
export const apiUrl = 'https://app.sweetmochi.tw/api';

/** Youtube API */
export const apiYoutube = 'https://youtube.googleapis.com/youtube/v3/videos';

/** 資料網址 */
export const dataUrl = '/data';

/**
 * 日期格式化
 */
export const dateFormats: MatDateFormats = {
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
export const httpRetryTimes = 3;

/**
 * 小提醒自動淡出時間
 */
export const snackBarFadeoutTime = 3000;
