import { MatDateFormats } from '@angular/material/core';
import { HttpMothod } from '../type';


/** 主機 API */
export const apiUrl = 'https://app.sweetmochi.tw/api';

/** Youtube API */
export const apiYoutube = 'https://youtube.googleapis.com/youtube/v3/videos';

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

/**
 * HTTP 重試基礎延遲（毫秒）
 */
export const httpRetryDelay = 500;

/**
 * 可重試的 HTTP 方法
 */
export const httpRetryMethods: HttpMothod[] = ['get'];

/**
 * 可重試的 HTTP 狀態碼
 * 	0: 網路錯誤
 * 	502: Bad Gateway
 * 	503: Service Unavailable
 * 	504: Gateway Timeout
 */
export const httpRetryStatus = [0, 502, 503, 504];
