
/** API 網址 */
export const API_URL = 'https://app.sweetmochi.tw/api/';

/** YouTube 短網址 */
export const YOUTUBE_SHORT_URL = 'youtu.be';


/** YouTube 網域列表 */
export const YOUTUBE_HOST_LIST = ['youtube.com', 'www.youtube.com', YOUTUBE_SHORT_URL];


/**
 * 網址正則表達式
 *
 *      http 或 s -> 選填
 *      英數字與「-」構成
 *      頂級網域只允許英文
 */
export const URL_REGEX = /(https?:\/\/)?[\da-z]+\.[a-z]+/;
