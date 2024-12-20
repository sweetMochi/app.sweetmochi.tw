
/**
 * 網址正則表達式
 *
 *      http 或 s -> 選填
 *      英數字與「-」構成
 *      頂級網域只允許英文
 */
export const urlRegex = /(https?:\/\/)?[\da-z]+\.[a-z]+/;
